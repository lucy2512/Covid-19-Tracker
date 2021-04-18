import React from 'react'
import {Card,CardContent, Typography} from "@material-ui/core"
import "./InfoBox.css";

function InfoBox({title ,cases, active, isRed, isOrange, total, ...props}) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"} ${isOrange && "infoBox--orange"}`}>
            <CardContent>
                {/* Title:Coronavirus cases */}
                <Typography className="infoBox__title"color="textSecondary">{title}</Typography>

                {/* +120k Number of cases*/}
                <h2 className={`infoBox__cases ${!isRed && !isOrange && "infoBox__cases--green"}`}>{cases}</h2>

                {/* 1.2M Total */}
                <Typography className="infoBox__total" color="textSecondary">{total}Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
