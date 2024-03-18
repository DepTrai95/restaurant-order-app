<template>
   <div class="mt-4">
      <h1 class="sr-only">Hinweise zu Allergenen</h1>
      <Card>
         <template #title>Hinweise zu Allergenen</template>
         <template #content>
            <p>Liebe Gäste,</p>
            <p>
               wir bereiten alle Speisen für dich frisch zu und verzichten, womöglich, auf Konservierungsstoffe und
               Geschmacksverstärker. Wir haben versucht alle möglichen enthaltenen Allergene und Zusatzstoffe zu
               kennzeichnen. Sollten noch Fragen offen sein, versuchen wir gerne weiterzuhelfen.
            </p>
         </template>
      </Card>
      <Card class="mt-4">
         <template #content>
            <h2 class="h4">Zusatzstoffe</h2>
            <div class="zusatzstoff-container">
               <span v-for="zusatzstoff in zusatzstoffe" :key="zusatzstoff.nummer">
                  {{ zusatzstoff.nummer }} {{ zusatzstoff.name }}
               </span>
            </div>
         </template>
      </Card>
      <Card class="mt-4">
         <template #content>
            <h2 class="h4">Allergene</h2>
            <div class="allergies-container">
               <span v-for="allergie in allergene" :key="allergie.id">
                  {{ allergie.letter }} {{ allergie.name }}
               </span>
            </div>
         </template>
      </Card>
   </div>
</template>

<script>
export default {
   data() {
      return {
         zusatzstoffe: [
            {
               "nummer": 1,
               "name": "Konservierungsstoffe"
            },
            {
               "nummer": 2,
               "name": "Geschmacksverstärker"
            },
            {
               "nummer": 3,
               "name": "Antioxidationsmittel"
            },
            {
               "nummer": 4,
               "name": "Farbstoff"
            },
            {
               "nummer": 5,
               "name": "Phosphat"
            },
            {
               "nummer": 6,
               "name": "Chinin"
            },
            {
               "nummer": 7,
               "name": "Koffein"
            },
            {
               "nummer": 8,
               "name": "geschwefelt"
            },
            {
               "nummer": 9,
               "name": "Saccharin"
            },
            {
               "nummer": 10,
               "name": "Aspartam/Phenyl."
            },
            {
               "nummer": 11,
               "name": "Cyclamat"
            },
            {
               "nummer": 12,
               "name": "Acesulfam"
            },
         ],
         allergene: [
            {
               "letter": 'A',
               "name": "Gluten"
            },
            {
               "letter": 'B',
               "name": "Krebstiere"
            },
            {
               "letter": 'C',
               "name": "Eier von Geflügel"
            },
            {
               "letter": 'D',
               "name": "Fisch"
            },
            {
               "letter": 'E',
               "name": "Erdnüsse"
            },
            {
               "letter": 'F',
               "name": "Sojabohnen"
            },
            {
               "letter": 'G',
               "name": "Milch und Milcherzeugnisse"
            },
            {
               "letter": 'H',
               "name": "Schalentiere"
            },
            {
               "letter": 'L',
               "name": "Sellerie"
            },
            {
               "letter": 'M',
               "name": "Senf"
            },
            {
               "letter": 'N',
               "name": "Sesam"
            },
            {
               "letter": 'O',
               "name": "Schwefeloxid"
            },
            {
               "letter": 'P',
               "name": "Lupinen"
            },
            {
               "letter": 'R',
               "name": "Weichtiere"
            },
         ]
      

      }
   }
}
</script>

<style lang="scss" scoped>
.zusatzstoff-container,
.allergies-container {
   span {
      @include responsive-font-size(1.6rem, 1.8rem);
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      white-space: nowrap;
      width: 100%;
   }
}
</style>