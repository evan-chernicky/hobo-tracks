import React from 'react'
import Mountains from './assets/mountains.jpg'
import Evan from './assets/evan.jpg'
import Website from './assets/website.svg'
import Instagram from './assets/Instagram.svg'
import Medium from './assets/medium.svg'
import LinkedIn from './assets/LinkedIn.svg'






function About() {
  return (
    <div className="grid lg:grid-cols-2 pt-40 w-full py-14 max-w-screen-xl mx-auto">
    <div className="h-100 w-100 bg-no-repeat bg-cover text-left lg:px-20 px-10 flex lg:flex-col flex-col-reverse">
      <div>
        <h2 className="text-5xl max-w-xl leading-tight text-green font-bold max-w-md pb-6">Pass a note for the next person</h2>
        <p className="text-lg mb-12">Inspired from the explorers and adventures of the past, HoboTracks takes inspiration from the "Hobo Code" used in the early 20th by train hoppers. HoboTracks allows you to create a personal journal of your trip, follow other travelers' journeys, and see what messages they left behind all over the globe. <strong className="text-orange">Our mission is to create a community of explorers who are able to learn from the experience of others, while passing along a note for the next person.</strong></p>
      </div>
        <img className="mb-8" src={Mountains} alt="Mountains" />
    </div>
    <div className="h-100 w-100 flex-col lg:px-20 px-10">
    <div className="h-96 overflow-hidden relative "> 
        <img className="absolute inset-0 m-auto" src={Evan} alt="Mountains" />
    </div>
    <div className="bg-green p-10 text-white text-left">
        <h2 className="text-2xl font-bold mb-4">About the creator</h2>
        <p>The idea of HoboTracks was inspired by my personal experiences traveling through Colombia. I learned a great deal from talking to people in hostels and sharing my own experiences with others. Discouraged by current travel journals on the market, and finding it hard to keep up with friends I met on the road, I came up with the idea of HoboTracks shortly after. I hope that this app helps future explorers plan and document their trips as well as learn more about the people and world around them.</p>
        <p className="my-4"><strong>-Evan Chernicky</strong></p>
        <div className="flex flex-row mt-6">
          <a className="pr-3" href="https://evanchernicky.com/" target="_blank" rel="noreferrer">
            <img className="w-5" src={Website} alt="Evan Chernicky Website"/>
          </a>
          <a className="pr-3" href="https://www.linkedin.com/in/echernicky/" target="_blank" rel="noreferrer">
            <img className="w-5" src={LinkedIn} alt="Evan Chernicky LinkedIn"/>
          </a>
          <a className="pr-3" href="https://medium.com/@echernicky" target="_blank" rel="noreferrer">
            <img className="w-5" src={Medium} alt="Evan Chernicky Medium"/>
          </a>
          <a className="pr-3" href="https://www.instagram.com/shaken_not_cherned/" target="_blank" rel="noreferrer">
            <img className="w-5" src={Instagram} alt="Evan Chernicky Instagram"/>
          </a>
        </div>
      </div>
    </div>
</div>
  )
}

export default About