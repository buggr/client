import React from "react"

import ErrorMessage from "../ErrorMessage"

import Api from "../../services/Api"

import "./style.scss"

const data = Api()

export default function HackatonList() {
  return (
    <div className="hackatons-container">
      {data.length ? (
        data.map((hackaton, index) => (
          <HackatonCard
            hackaton={hackaton}
            key={hackaton.title.toLowerCase() + "-" + index}
          />
        ))
      ) : (
        <ErrorMessage
          content={"Você ainda não participou de nenhum hackaton :("}
        />
      )}
    </div>
  )
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
