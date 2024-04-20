<template>
   <div>
      <!-- upload food -->
      <div class="upload">
         <h2>Lade Speisekategorien hoch</h2>
         <div class="upload__information">
            <div class="upload__file">
               <input type="file" id="file-upload" aria-label="Datei auswählen" @change="handleFileUpload">
               <label for="file-upload">
                  <font-awesome-icon icon="fa-upload" />
                  <span>
                     Lade ein Bild für eine Speisekategorie hoch
                  </span>
               </label>
            </div>
            <input type="text" v-model="urlPath" placeholder="URLPath food/example">
            <input type="text" v-model="categoryName" placeholder="Bildname">
            <button class="btn-primary" @click="uploadCategory('food')">Speisekategorie hochladen</button>
         </div>
      </div>
      <!-- upload drinks -->
      <div class="upload">
         <h2>Lade Getränkekategorien hoch</h2>
         <div class="upload__information">
            <div class="upload__file">
               <input type="file" id="file-upload" aria-label="Datei auswählen" @change="handleFileUpload">
               <label for="file-upload">
                  <font-awesome-icon icon="fa-upload" />
                  <span>
                     Lade ein Bild für eine Getränkekategorie hoch
                  </span>
               </label>
            </div>
            <input type="text" v-model="urlPath" placeholder="URLPath drinks/example">
            <input type="text" v-model="categoryName" placeholder="Bildname">
            <button class="btn-primary" @click="uploadCategory('drinks')">Getränkekategorie hochladen</button>
         </div>
      </div>
      <div>
         <div class="upload">
            <h2>Lade Speisen in eine Kategorie hoch</h2>
            <div class="upload__file">
               <input type="file" id="file-upload" aria-label="Datei auswählen" @change="handleFileUpload">
               <label for="file-upload">
                  <font-awesome-icon icon="fa-upload" />
                  <span>
                     Lade ein Bild für eine bestimmte Speise hoch
                  </span>
               </label>
            </div>
            <div class="upload__information">
               <select v-model="selectedFood">
                  <option v-for="option in foodCategories" :value="option.id" :key="option.id">{{ option.id }}</option>
               </select>
               <input type="text" v-model="dishName" placeholder="Speisename">
               <input type="text" v-model="dishDesc" placeholder="Beschreibung Speise">
               <input type="number" v-model="dishPrice" placeholder="Preis">
               <button class="btn-primary" @click="uploadDish('food', selectedFood)">Speise hochladen</button>
            </div>
         </div>
      </div>
      <div>
         <div class="upload">
            <h2>Lade Getränke in eine Kategorie hoch</h2>
            <div class="upload__information">
               <div class="upload__file">
                  <input type="file" id="file-upload" aria-label="Datei auswählen" @change="handleFileUpload">
                  <label for="file-upload">
                     <font-awesome-icon icon="fa-upload" />
                     <span>
                        Lade ein Bild für ein bestimmtes Getränk hoch
                     </span>
                  </label>
               </div>
               <select v-model="selectedDrink">
                  <option v-for="option in drinkCategories" :value="option.id" :key="option.id">{{ option.id }}</option>
               </select>
               <input type="text" v-model="dishName" placeholder="Getränkename">
               <input type="text" v-model="dishDesc" placeholder="Beschreibung Getränk">
               <input type="number" v-model="dishPrice" placeholder="Preis">
               <button class="btn-primary" @click="uploadDish('drinks', selectedDrink)">Getränk hochladen</button>
            </div>
         </div>
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
         dishDesc: null,
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
               description: this.dishDesc,
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
.upload {
   background-color: $color-background-card;
   border-radius: 5px;
   margin-block: 3rem;
   padding: 2rem;

   &__information {
      display: flex;
      flex-direction: column;

      input,
      select,
      .btn-primary {
         background-color: transparent;
         border: 1px solid grey;
         border-radius: 5px;
         margin-block: 0.75rem;
         outline: none;
         padding: 1rem;
         transition: border-color .3s ease-in-out;
         
         &:hover,
         &:focus {
            border-color: $color-primary;
         }
      }

      .btn-primary {
         background-color: $color-primary;
         border: 1px solid $color-primary;
         border-radius: 5px;
      }

   }
   .upload__file {
      margin-block: 0.75rem;

      input {
         display: none;
      }

      > label {
         border: 3px dashed $color-primary;
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         padding: 1.5rem;
         cursor: pointer;
         width: 100%;

         .fa-upload {
            height: 24px;
            width: 24px;
            margin-bottom: 1.5rem;
         }

         span {
            font-size: 1.5rem;
         }
      }
   }
}
</style>