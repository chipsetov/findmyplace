import React, {Component} from 'react';
import HistoryItem from "./HistoryItem";
import {Row} from "react-materialize";
import Place from "../User/UserPlaces/Place";
import {getVisitHistory} from "../../util/APIUtils";

class History extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visits: []
        }
    }

    componentDidMount() {
        getVisitHistory()
            .then((response) => {
                this.setState({
                    visits: response,
                });
        });

    }

    render() {

        const visits = this.state.visits;
        console.log(visits);

        return(
            <Row className="places-container">
                {
                    visits.map((visit, index) =>
                        <HistoryItem
                            key={index}
                            placeId={visit.placeId}
                            visitTime={visit.visitTime}
                            userId={visit.userId}/>
                    )
                }
            </Row>
        );
    }
}

export default History