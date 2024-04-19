<template>
   <div>
      <!-- upload food -->
      <div>
         <h2>UPLOAD FOOD CATEGORIES</h2>
         <!-- Input-Feld für Datei-Upload -->
         <input type="file" @change="handleFileUpload">
         <input type="text" v-model="urlPath" placeholder="URLPath food/example">
         <input type="text" v-model="categoryName" placeholder="Bildname">
         <button @click="uploadCategory('food')">Speisekategorie hochladen</button>
      </div>
      <!-- upload drinks -->
      <div>
         <h2>UPLOAD DRINK CATEGORIES</h2>
         <!-- Input-Feld für Datei-Upload -->
         <input type="file" @change="handleFileUpload">
         <input type="text" v-model="urlPath" placeholder="URLPath drinks/example">
         <input type="text" v-model="categoryName" placeholder="Bildname">
         <button @click="uploadCategory('drinks')">Getränkekategorie hochladen</button>
      </div>
      <div>
         <h2>UPLOAD FOOD IN THE CATEGORIES</h2>
         <!-- Input-Feld für Datei-Upload -->
         <input type="file" @change="handleFileUpload">
         <select v-model="selectedFood">
            <option v-for="option in foodCategories" :value="option.id" :key="option.id">{{ option.id }}</option>
         </select>
         <input type="text" v-model="dishName" placeholder="Speisename">
         <input type="number" v-model="dishPrice" placeholder="Preis">
         <button @click="uploadDish('food', selectedFood)">Speise hochladen</button>
      </div>
      <div>
         <h2>UPLOAD DRINKS IN THE CATEGORIES</h2>
         <!-- Input-Feld für Datei-Upload -->
         <input type="file" @change="handleFileUpload">
         <select v-model="selectedDrink">
            <option v-for="option in drinkCategories" :value="option.id" :key="option.id">{{ option.id }}</option>
         </select>
         <input type="text" v-model="dishName" placeholder="Getränkename">
         <input type="number" v-model="dishPrice" placeholder="Preis">
         <button @click="uploadDish('drinks', selectedDrink)">Getränk hochladen</button>
      </div>
   </div>
</template>

<script>
import { setDoc, doc, serverTimestamp, getDocs, collection } from "firebase/firestore";
import { storage, db } from "../../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default {
   data() {
      return {
         categoryImage: null,
         categoryName: null,
         urlPath: null,
         dishName: null,
         dishPrice: null,
         foodCategories: [],
         drinkCategories: [],
         selectedFood: null,
         selectedDrink: null,
      }
   },
   methods: {
      async fetchCategories() {
         try {
            const foodRes = await getDocs(collection(db, 'food'));
            foodRes.forEach((doc) => {
               const foodCategory = {
                  id: doc.id,
               };
               this.foodCategories.push(foodCategory);
            });
            const drinkRes = await getDocs(collection(db, 'drinks'));
            drinkRes.forEach((doc) => {
               const drinkCategory = {
                  id: doc.id,
               };
               this.drinkCategories.push(drinkCategory);
            });
         } catch (error) {
            console.error('Error loading food categories:', error);
         }
      },
      handleFileUpload(event) {
         this.categoryImage = event.target.files[0];
      },
      async uploadCategory(category) {
         if (!this.categoryImage || !this.categoryName) {
            alert('Bitte füllen Sie alle Felder aus.');
            return;
         }
         const storageRef = ref(storage, category + '/' + this.categoryImage.name);
         const uploadTask = uploadBytesResumable(storageRef, this.categoryImage);

         uploadTask.on("state_changed",
            (snapshot) => {
               const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (error) => {
               alert(error);
            },
            () => {
               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
               });
            }
         )

         try {
            const imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
            const docRef = doc(db, category, this.urlPath);
            await setDoc(docRef, {
               name: this.categoryName,
               imgUrl: imgUrl,
               urlPath: this.urlPath,
               createdAt: serverTimestamp(),
            });
            console.log('Bild erfolgreich hochgeladen, Firestore-Dokument-ID:', docRef.id);
         } catch (error) {
            console.error('Fehler beim Hochladen des Bildes:', error);
         }
      },
      async uploadDish(category, selectedItem) {
         if (!this.categoryImage || !selectedItem || !this.dishPrice || !this.dishName ) {
            alert('Bitte füllen Sie alle Felder aus.');
            return;
         }

         const storageRef = ref(storage, category + '/' + selectedItem + '/' + this.dishName);
         const uploadTask = uploadBytesResumable(storageRef, this.categoryImage);

         uploadTask.on("state_changed",
            (snapshot) => {
               const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (error) => {
               alert(error);
            },
            () => {
               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('Image File available at', downloadURL);
               });
            }
         )

         try {
            const imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
            const urlPath = this.dishName.toLowerCase();
            const docRef = doc(db, category, selectedItem, 'dishes', urlPath);
            await setDoc(docRef, {
               name: this.dishName,
               price: this.dishPrice,
               imgUrl: imgUrl,
               urlPath: urlPath,
               createdAt: serverTimestamp(),
            });
            console.log('Speise/Getränk erfolgreich hochgeladen, Firestore-Dokument-ID:', docRef.id);
         } catch (error) {
            console.error('Fehler beim Hochladen der Speise/des Getränkes:', error);
         }
      }
   },
   async mounted() {
      await this.fetchCategories();
   },
}
</script>

<style lang="scss" scoped>

</style>