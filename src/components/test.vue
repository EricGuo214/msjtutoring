<template>
  <v-app id="inspire">
    <v-select
      v-model="chosenClasses"
      :items="classes"
      item-text="name"
      :menu-props="{ maxHeight: '400' }"
      label="Choose your classes"
      multiple
      chips
      return-object
    ></v-select>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      chosenClasses: [],
      classes: [
        {
          name: "AP Computer Science A",
          date: "5/18",
          startTime: "1:00",
          mcqInfo: "Section I: 90 minutes, 40 MCQ",
          mcqTime: 90,
          mcqQ: 40,
          numChecks: 4,
          isEditing: false,
        },
        {
          name: "AP Biology",
          date: "5/27",
          startTime: "9:00",
          mcqInfo: "Section I: 90 minutes, 60 MCQ",
          mcqTime: 90,
          mcqQ: 60,
          numChecks: 6,
          isEditing: false,
        },
        {
          name: "AP Statistics",
          date: "6/10",
          startTime: "1:00",
          mcqInfo: "Section I: 90 minutes, 40 MCQ",
          mcqTime: 90,
          mcqQ: 40,
          numChecks: 4,
          isEditing: false,
        },
      ],
    };
  },
  methods: {
    rowClick: function(item, row) {
      row.select(true);

      this.selectedId = item.name;
      console.log(this.selectedId);
    },
  },
};
</script>

<style scoped></style>
