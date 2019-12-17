import React from "react";

import Colosseum from "./images/Colosseum.jpg";
import TheRoseCityOfPetra from "./images/The_Rose_City_of_Petra.jpg";
import TajMahal from "./images/TajMahal.jpg";
import ChinaWall from "./images/china_wall.jpg";
import ChichenItza from "./images/ChichenItza.jpg";
import MachuPichu from "./images/machu_pichu.jpg";
import Christredeemer from "./images/christredeemer.jpg";

function Header(){
  return <header className="header"><h1>Wonders tour</h1></header>;
}

function Section(){
  return (
  <section className="section">
  	<p>
  	Here at <b><i>Wonders tour</i></b>, we take you to the seven wonders of the world. 31 days, seven wonders, innumerable amazing experiences. Discover what you could be seeing and let us teach you about the new seven wonders of the world.
  	</p>
  	<div>
  		<h1>Tour 1 : The Colosseum of Rome</h1>
  		<img src={Colosseum} height="250px" width="450px" />
  		<p>The Roman Colosseum is thought to be the largest amphitheatre ever made. Built more than 1,900 years ago, its beauty stands in contrast to its troubling history of power, cruelty and cold-blooded killings. Amazingly, the colosseum as it currently stands is a shadow of its former self. After years of being plundered by Roman popes and aristocrats to furnish their churches and mansions after it fell into disrepair, two thirds of the original has been destroyed. Despite this, gazing at the impressive stonework that was constructed in AD 80 will make your draw in a sharp breath as you consider the meaning and heartache behind it.</p>
  	</div>
  	<div>
  		<h1>Tour 2 : The Rose City of Petra</h1>
  		<img src={TheRoseCityOfPetra} height="250px" width="450px" />
  		<p>This ancient city in Jordan is carved into the red rocks of Petra and is a UNESCO world heritage site. It looks like a city carved from a dream; the facades and windowsills bleeding from the pink rock like they were formed naturally. Exploring the streets, you’ll discover tombs, temples, a roman colonnaded street and a remarkable amphitheatre. It used to serve as a hub for Middle Eastern and Asian goods traders, and is considered to be one of the most valuable archaeological sites ever.</p>
  	</div>
  	<div>
  		<h1>Tour 3: Taj Mahal</h1>
  		<img src={TajMahal} height="250px" width="450px" />
  		<p>This extraordinary monument, built entirely of white marble, was made with love. It was created by the Emperor Shah Jahan to honour the memory of his beloved wife Mumtaz Mahal, who died in childbirth. Construction first began in 1631, and around 20,000 people were required to complete it; even so, it wasn’t finished until 1653. The Taj Mahal is one of the jewels of India and is a universally admired masterpiece.</p>
  	</div>
  	<div>
  		<h1>Tour 4: The Great Wall of China</h1>
  		<img src={ChinaWall} height="250px" width="450px" />
  		<p>Although the myth that you can see the Great Wall of China from space is inaccurate, at over 20,000 kilometres long and more than 2,300 years old, it’s still an incredibly impressive structure. You might lose your breath as you climb its stairs, both because it’s incredibly steep and due to its breathtaking views. Once used to protect China from invaders from the north, it now attracts thousands of onlookers every day and strikes an impressive path across the dramatic Chinese landscape.</p>
  	</div>
  	<div>
  		<h1>Tour 5: Chichen Itza</h1>
  		<img src={ChichenItza} height="250px" width="450px" />
  		<p>This magnificent site represents a hugely important portion of Mayan history, and you can walk among the ruins of their city and wonder at what they created. At 300 hectares it’s a lot to take in, but the most famous sights include the Kukulkan pyramid, the Castle, the ballgame court and the Temple of the Tigers. The city was established around 415 AD and the people who lived there left their mark on the world through their incredible stonework and artistry.</p>
  	</div>
  	<div>
  		<h1>Tour 6: Machu Picchu</h1>
  		<img src={MachuPichu} height="250px" width="450px" />
  		<p>This legendary location is one of the world’s most impressive sights that everyone should see in their lifetime. Built by the Incas, this 15th-century citadel is perched on a mountain ridge 2,430 metres above sea level. Originally constructed by the Inca emperor Pachacuti, the world forgot about this majestic site until 1911 when a man named Hiram Bingham brought it to global attention.</p>
  	</div>
  	<div>
  		<h1>Tour 7: Christ the Redeemer</h1>
  		<img src={Christredeemer} height="250px" width="450px" />
  		<p>This art deco statue of Jesus Christ is 30 metres tall and 28 metres wide, and is located at the top of the 700 metre-tall Corcovado mountain in the Tijuca Forest National Park, watching over the city of Rio de Janeiro. Funded almost entirely by donations from Brazilian Catholics, it’s a symbol of Christianity around the world and is a cultural icon.</p>
  	</div>
  </section>);
}

function Main(){
  return <main className="main">
            <Header />
            <Section />
        </main>;
}

export default Main;
