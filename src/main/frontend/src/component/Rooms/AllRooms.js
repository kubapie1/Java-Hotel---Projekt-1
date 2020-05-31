import React, { Component } from "react";
import RoomService from "../../service/RoomService"
import RoomThumbnail from "./RoomThumbnail"
import SearchRoom from "../Search/SearchRoom";

export default class AllRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allRooms: [],
            allStandards: [],
            onlyEmpty: false,
            floorRegex: ".*",
            standardRegex: ".*",
        }
        RoomService.getAllRooms1().then(res => {
            this.setState({allRooms: res});
            console.log(res);
        });

        RoomService.getAllStandards().then(res => {
            this.setState({allStandards: res});
        });

        this.handleSelectFloor = this.handleSelectFloor.bind(this);
        this.handleSelectStandard = this.handleSelectStandard.bind(this);
    }

    handleSelectFloor(event) {
        this.setState({floorRegex: event.target.value});
    }

    handleSelectStandard(event) {
        this.setState({standardRegex: event.target.value});
    }

    render() {

        let roomThumbnails = this.state.allRooms.filter(room => {
            if(this.state.onlyEmpty)
                return room.currentNumberOfGuests == 0;
            else
                return true;
        }).filter(room => {
            return room.roomName.match(this.state.floorRegex);
        }).filter(room => {
            return room.roomStandard.name.match(this.state.standardRegex);
        }).map(room => (
            <div key={room.id}>
                <RoomThumbnail room={room}/>
            </div>
        ));

        return(
            <div className="main-container">
                <div className="content">
                    <SearchRoom/>
                    <input className="checkbox" type="checkbox" onClick={() => this.setState({onlyEmpty: !this.state.onlyEmpty})}></input>
                    <label style={{padding: '5px 12px 5px'}}>Tylko wolne pokoje</label>
                    <label style={{padding: '5px 12px 5px 30px'}}>Piętro:</label>
                    <select onChange={this.handleSelectFloor}>
                        <option value=".*" selected>Wszystkie</option>
                        <option value="^1">1</option>
                        <option value="^2">2</option>
                        <option value="^3">3</option>
                        <option value="^4">4</option>
                        <option value="^5">5</option>
                    </select>
                    <label style={{padding: '5px 12px 5px 30px'}}>Standard:</label>
                    <select onChange={this.handleSelectStandard}>
                        <option value=".*" selected>Dowolny</option>
                        {this.state.allStandards.map(standard => (
                            <option value={standard.name}>{standard.name}</option>
                        ))}
                    </select>
                    {roomThumbnails}
                </div>
            </div>
        )
    }
}