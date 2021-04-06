<template>

<body>
  <div>
    <div class = "margins">
        <h1> Mission Tutoring </h1>
        <p></p>
        <p></p>
        <h2> Our Mission </h2>
        <p class = "testing"> Mission Tutoring is a website where students get paired with personalized tutors. Our goal is to create an environment where students struggling in certain areas can get the best assistance available. We have bridged the gap between students looking for help and tutors looking to assist. </p>
        <table class = "table">
          <tr>
            <td>
              <img src = "./ankith_pic.png" />
              <h3 class = "people"> Ankith Bachhu </h3>
              <p>Hello! I am currently 16 years old and a junior at Mission San Jose High. I joined MSJ tutoring because I wanted to give people an opportunity to get help if they needed it. I wanted to spread my
              knowledge with the community. In my spare time I love to code and run.</p>
             </td>
             <td>
               <img src = "./RithPic.jpg" />
               <h3 class = "people"> Rithwik Vaidun </h3>
               <p>Hey! I am currently 16 years old and a junior at Mission San Jose High. I joined MSJ tutoring because I love to spread my knowledge with other people. I didn't want there to be a barrier
               for people like me to not to be able to help and teach people. In my spare time I love to run and play sports, especially table tennis. </p>
              </td>
          </tr>

          <!-- David and Eric edit ur stuff for the personal information-->
          <tr>
            <td>
              <img src = "./ankith_pic.png" />
              <h3 class = "people"> David Guo </h3>
              <p>Hello! I am currently 16 years old and a junior at Mission San Jose High. I joined MSJ tutoring because I wanted to give people an opportunity to get help if they needed it. I wanted to spread my
              knowledge with the community. In my spare time I love to code and run.</p>
             </td>
             <td>
               <img src = "./RithPic.jpg" />
               <h3 class = "people"> Eric Guo </h3>
               <p>Hey! I am currenlt 16 years old and a junior at Mission San Jose High. I joined MSJ tutoring because I love to spread my knowledge with other people. I didn't want there to be a barrier
               for people like me to not to be able to help and teach people. In my spare time I love to run and play sports, especially table tennis. </p>
              </td>
          </tr>

        </table>
    </div>
  </div>


</body>
</template>


<style scoped>

body{

  border: 20px solid #2EC486;
  margin: 0px;

}


.margins{
  text-align: center;
  padding: 10px;
}

.title{

  text-align:center;
  color: green;

}

.people{

text-align: center;
padding: 5px;

}

.testing{
  padding-left: 250px;
  padding-right: 250px;
}

.table {
  margin: auto;
}

img {
  border-radius: 50%;
  height: 150px;
  width: 150px;
}

td{
  height: 400px;
  width: 400px;
  border: 7px solid white;
  padding: 15px;
}


</style>
