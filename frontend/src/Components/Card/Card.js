import React from 'react'

import styles from '../../../styles/Home.module.css'
import { Card, Button } from 'react-bootstrap'
import Image from 'next/image'
export default function MenuItem(props) {
    const val = [
        {
            path: "/book",
            title: "Books",
            imgPath: "/books.jpeg",
            desc: "Find the latest books here"
        }
        ,
        {
            path: "/3d",
            title: "3d world",
            imgPath: "/3d.jpg",
            desc: "sell of buy your 3D models"
        },
        {
            path: "/appliance.jpg",
            title: "Home appliance",
            imgPath: "/appliance.jpg",
            desc: "Find your necessary home appliance here"
        },
        {
            path: "/architecture",
            title: "Books",
            imgPath: "/architecture.jpeg",
            desc: "Get the best architectact here hire now"
        },
        {
            path: "/bedding",
            title: "Bedding and Bedclothes",
            imgPath: "/book.jpeg",
            desc: "Looking for bedding cloth you are in the right place"
        },
        {
            path: "/handicrafts",
            title: "Handicrafts",
            imgPath: "/handcraft.jpg",
            desc: "Find the latest books here"
        },
        {
            path: "/book",
            title: "Books",
            imgPath: "/book.jpeg",
            desc: "Find the latest books here"
        }
    ]




    return (
        <div className={styles.grid}>
            { val.map(res => {
                return(
                       <a href={res.path} className={styles.card}>
                    <h3>{res.title} &rarr;</h3>
                    <div className="card__image-container">
                        <img src={res.imgPath} width={350} />
                    </div>
                    <p>{res.desc}</p>
                </a>
                )
             
            })

            }
        </div>
    )


}

