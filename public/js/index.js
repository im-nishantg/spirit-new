// put js file here
let speakersArray = [
    {
  
      id: "speaker-1",
      name: "Dr. Duvvuri Subbarao",
      src: "/speakers/image1.webp",
      job: "22nd Governer of RBI",
      description: "Indian Economist, Central Banker and Civil Servant. Often regarded as a reformer at heart, he has advocated for inclusive economic policy."
    },
  
    {
  
      id: "speaker-2",
      name: "Dr. Sailesh Kumar",
      src: "/speakers/image2.webp",
      job: "Cheif Data Scientist at Realiance Jio",
      description: "Dr Kumar, an alumnus of IIT (BHU) CSE '95, is currently the Chief Data Scientist at AICoE/Reliance Jio, Mentor and Program Chair for the AI & DS Program at the Jio Institute of Eminence, and visiting faculty of Machine Learning at Indian School of Business."
    }
  ]
  

document.querySelectorAll(".img-box img").forEach(image => {

    image.onclick = () => {
        let path = image.getAttribute("src");
        console.log(path);
    
        const object = speakersArray.find(obj => obj.src === path)
        
        document.querySelector(".popup").style.display = "block";
        document.getElementsByClassName("speaker-img")[0].setAttribute("src", path);
        document.getElementsByClassName("speaker-name")[0].innerHTML = object.name;
        document.getElementsByClassName("speaker-job")[0].innerHTML = object.job;
        document.getElementsByClassName("speaker-desc")[0].innerHTML = object.description;
    }
})

document.querySelector(".popup span").onclick = () =>{

    document.querySelector(".popup").style.display = "none";

}
