<template>

<body>
  <div>
    <div class = "margins">
        <h1> Mission Tutoring</h1>
        <img src="./mission_pic.jpg" >
        <p class = "create"></p>
        <h2> Our Mission </h2>
        <p class = "testing"> Mission Tutoring is a website where students get paired with personalized tutors. Our goal is to create an environment where students struggling in certain areas can get the best assistance available from their peers. We have bridged the gap between students looking for help and tutors looking to assist. </p>
        <p class = "create"></p>

        <h2> How We Work</h2>
        <table class = "table">
          <tr>
            <td>
              <p> 1) Register as a tutor or tutee</p>
              <p> As a tutor you will see all the tutee requests</p>
              <p> As a tutee you will be able to make requests for a tutor</p>

            </td>
          </tr>
        </table>

        <table class = "table">
          <tr>
            <td class = "td1">
              <img src = "./david.jpg" >
              <h3 class = "people"> David Guo </h3>
              <p>Nice to meet you! I created and led MSJ tutoring because I wanted to create a tool that would help struggling students and encourage kindness. With MSJ Tutoring, exceptional students are given
                 the oppurtunity to gain experience in teaching and struggling students can learn from their successful peers. My hobbies are dancing, running, and playing the piano!</p>
             </td>
             <td class = "td1">
               <img src = "./RithPic.jpg" >
               <h3 class = "people"> Eric Guo </h3>
               <p>Hey! I am currenlt 16 years old and a junior at Mission San Jose High. I joined MSJ tutoring because I love to spread my knowledge with other people. I didn't want there to be a barrier
               for people like me to not to be able to help and teach people. In my spare time I love to run and play sports, especially table tennis. </p>
              </td>
          </tr>
          <tr>
            <td class = "td1">
              <img src = "./ankith_pic.png" >
              <h3 class = "people"> Ankith Bachhu </h3>
              <p>Hello! I am currently 16 years old and a junior at Mission San Jose High. I joined MSJ tutoring because I wanted to give people an opportunity to get help if they needed it. I wanted to spread my
              knowledge with the community. In my spare time I love to code and run.</p>
             </td>
             <td class = "td1">
               <img src = "./RithPic.jpg" >
               <h3 class = "people"> Rithwik Vaidun </h3>
               <p>Hey! I am currently 16 years old and a junior at Mission San Jose High. I joined MSJ tutoring because I love to spread my knowledge with other people. I didn't want there to be a barrier
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

.create{
  padding-top: 20px;
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

h1{
  color: green;
}

h2{
  color: green;
}

img {
  border-radius: 50%;
  height: 150px;
  width: 150px;
}

.td1{
  height: 400px;
  width: 400px;
  border: 7px solid white;
  padding: 15px;
}


</style>
