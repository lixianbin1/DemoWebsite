import  React,{Suspense,lazy,useState} from 'react';
import {HashRouter as Router,Switch,Route} from 'react-router-dom'
import {list} from '../common/listData'

console.log(list)
function Home(){
    const listItem=list.map((i,k)=>{
      console.log(i)
        return(
            <div className="box clear" key={k}>
              <div>
                <a className="box_img" href={i.href} target="_blank" style={{backgroundImage:"url("+i.img+")"}}></a>
                <div className="box_content">
                  <h3><a href={i.href} target="_blank">{i.title}</a></h3>
                  <p>{i.text}</p>
                </div>
              </div>
            </div>
        )
    })
    return(
        <div className="bodyBoxs clear">
            {listItem}
        </div>
    )
}

export default Home;