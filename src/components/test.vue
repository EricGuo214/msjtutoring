<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item?</v-card-title
          >
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    // editedIndex: -1,
    // editedItem: {
    //   name: "",
    //   calories: 0,
    //   fat: 0,
    //   carbs: 0,
    //   protein: 0,
    // },
    // defaultItem: {
    //   name: "",
    //   calories: 0,
    //   fat: 0,
    //   carbs: 0,
    //   protein: 0,
    // },
  }),

  // computed: {
  //   formTitle() {
  //     return this.editedIndex === -1 ? "New Item" : "Edit Item";
  //   },
  // },

  // watch: {
  //   dialog(val) {
  //     val || this.close();
  //   },
  //   dialogDelete(val) {
  //     val || this.closeDelete();
  //   },
  // },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
      ];
    },

    // editItem(item) {
    //   this.editedIndex = this.desserts.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialog = true;
    // },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    // deleteItemConfirm() {
    //   this.desserts.splice(this.editedIndex, 1);
    //   this.closeDelete();
    // },

    // close() {
    //   this.dialog = false;
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   });
    // },

    // closeDelete() {
    //   this.dialogDelete = false;
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   });
    // },

    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.editedItem);
    //   } else {
    //     this.desserts.push(this.editedItem);
    //   }
    //   this.close();
    // },
  },
};
</script>
