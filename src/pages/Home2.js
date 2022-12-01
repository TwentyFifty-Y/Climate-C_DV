import React from 'react'
import { Link } from 'react-router-dom';



export default function Home() {
  return (
    <div className="home-container">
      <h1>Little bit of basic information about climate change</h1>

      <img src="https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274__480.jpg"/>
      
      <br/>
      <p>Climate change refers to long-term shifts in temperatures and weather 
        patterns. These shifts may be natural, such as through variations in the solar 
        cycle. But since the 1800s, human activities have been the main driver of climate change, 
        primarily due to burning fossil fuels like coal, oil and gas.
        <br/>
        <br/>
        Burning fossil fuels generates greenhouse gas emissions that act like a blanket 
        wrapped around the Earth, trapping the sun’s heat and raising temperatures.
        <br/>
        <br/>
        Examples of greenhouse gas emissions that are causing climate change include 
        carbon dioxide and methane. These come from using gasoline for driving a car 
        or coal for heating a building, for example. Clearing land and forests can also 
        release carbon dioxide. Landfills for garbage are a major source of methane emissions. 
        Energy, industry, transport, buildings, agriculture and land use are among the main emitters.</p>
        <a className="ext-link" href="https://www.un.org/en/climatechange/what-is-climate-change">Read more here!</a>
        <br/><br/>
        <h2>We can pay the bill now, or pay dearly in the future</h2>
    </div>
  )
}
