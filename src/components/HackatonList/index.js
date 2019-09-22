import React, { Component } from "react"
import { Link } from 'react-router-dom'
import Auth from '../../services/Auth'

import ErrorMessage from "../ErrorMessage"

import Api from "../../services/Api"

import "./style.scss"

const data = []

export default class HackatonList extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    this.getData()
    //const result = Api.get('/teams')
    //console.log(result)
    //const userHackatons = result.filter(hackaton => hackaton.partipants)
  }

  async getData(){
    const { data: teams } = await Api.get('/teams')

    const userTeams = teams.filter(team => team.participants.length && [...team.participants.map(participant => participant._id === Auth.userData._id && team._id)].includes(team._id))
    
    const { data: hackathons} = await Api.get('/hackathons')

    const userHackatons = hackathons.filter(hackaton => hackaton.teams.length && [...hackaton.teams.map(team => team._id)].includes([...userTeams.map(team => team._id)]))
    console.log(userHackatons)
  }

  render(){
    return (
      <div className="hackatons-container">
        {data.length ? (
          data.map((hackaton, index) => (
            <Link 
              to={`/dashboard/hackatons/${hackaton.id}`}
              key={hackaton.title.toLowerCase() + "-" + index}
            >
              <HackatonCard
                hackaton={hackaton}
              />
            </Link>
          ))
        ) : (
          <ErrorMessage
            content={"Você ainda não participou de nenhum hackaton :("}
          />
        )}
      </div>
    )
  }
}

function HackatonCard({ hackaton }) {
  return (
    <div
      className="card-container"
      style={{
        backgroundImage: hackaton.ended
          ? "linear-gradient(to right, #666, #555)"
          : "linear-gradient(to right, #fa256c, #bd0140)"
      }}
    >
      <h1 className="card-title">{hackaton.title}</h1>
      <div className="card-bottom-container">
        <span className="card-bottom-date">{hackaton.date}</span>
        <span className="card-bottom-ended">
          {hackaton.ended ? "Finalizado" : "Em Andamento"}
        </span>
      </div>
    </div>
  )
}
