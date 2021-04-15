import React from 'react'
import {Card,CardContent, Typography} from "@material-ui/core"

function InfoBox({title ,cases, total}) {
    return (
        <Card className="infoBox">
            <CardContent classname="infoBox__title">
                {/* Title:Coronavirus cases */}
                <Typography classname="infobox__cases"color="textSecondary">{title}</Typography>

                {/* +120k Number of cases*/}
                <h2>{cases}</h2>

                {/* 1.2M Total */}
                <Typography className="infobox__total">{total}Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
