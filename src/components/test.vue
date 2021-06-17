<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col" style="width:20%">
          <p></p>
        </th>
        <th scope="col" style="width:27%">
          <p><strong>8:00 a.m. Local Time</strong></p>
        </th>
        <th scope="col" style="width:27%">
          <p><strong>12:00 p.m. Local Time</strong></p>
        </th>
        <th scope="col" style="width:27%">
          <p><strong>2:00 p.m. Local Time</strong></p>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <p>
            <strong
              >Monday,<br />
              May 3, 2021</strong
            >
          </p>
        </td>
        <td>
          <p>United States Government and Politics</p>
        </td>
        <td>
          <p>Physics C: Mechanics</p>
        </td>
        <td>
          <p>Physics C: Electricity and Magnetism</p>
        </td>
      </tr>
      <tr>
        <td>
          <p>
            <strong
              >Tuesday,<br />
              May 4, 2021</strong
            >
          </p>
        </td>
        <td>
          <p>
            Calculus AB<br /><br />
            Calculus BC
          </p>
        </td>
        <td>
          <p>
            German Language and Culture<br /><br />
            Human Geography
          </p>
        </td>
        <td>
          <p></p>
        </td>
      </tr>
      <tr>
        <td>
          <p>
            <strong
              >Wednesday,<br />
              May 5, 2021</strong
            >
          </p>
        </td>
        <td>
          <p>English Literature and Composition</p>
        </td>
        <td>
          <p>
            Japanese Language and Culture (computer based)<br /><br />
            Physics 1: Algebra-Based
          </p>
        </td>
        <td>
          <p></p>
        </td>
      </tr>
      <tr>
        <td>
          <p>
            <strong
              >Thursday,<br />
              May 6, 2021</strong
            >
          </p>
        </td>
        <td>
          <p>United States History</p>
        </td>
        <td>
          <p>
            Art History<br /><br />
            Computer Science A
          </p>
        </td>
        <td>
          <p></p>
        </td>
      </tr>
      <tr>
        <td>
          <p>
            <strong
              >Friday,<br />
              May 7, 2021</strong
            >
          </p>
        </td>
        <td>
          <p>
            Chemistry<br /><br />
            Spanish Literature and Culture
          </p>
        </td>
        <td>
          <p>
            European History<br /><br />
            Physics 2: Algebra-Based
          </p>
        </td>
        <td>
          <p></p>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  data: () => ({
    dialog: false,

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
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

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
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
