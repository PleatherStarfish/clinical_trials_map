import React, {Component} from 'react';
import Form from './Form.js';
import Map from './Map.js';
import './App.css';

// Function to get the user's location
const getPosition = () => {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationName: '',
            gpsCoords: {},
            searchKeywords: ''
        };
        this.handleFormChangeLocation = this.handleFormChangeLocation.bind(this);
        this.handleFormChangeCondition = this.handleFormChangeCondition.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    // Get the user's geolocation
    getLocation() {
        getPosition()
            .then((position) => {
                let location = {};
                location.latitude = position.coords.latitude;
                location.longitude = position.coords.longitude;
                this.setState({gpsCoords: location}, () => {
                    console.log(`Lat: ${this.state.gpsCoords.latitude}`);
                    console.log(`Lng: ${this.state.gpsCoords.longitude}`);
                });
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    fetchData() {
        fetch(`http://localhost:3000/api/query/study_fields?expr=${this.state.searchKeywords}&area=AREA[LocationCity]Boston&fields=NCTId,Condition,LeadSponsorName,LocationFacility,BriefTitle,InterventionName,CollaboratorName,LocationCity,OverallStatus,PrimaryOutcomeMeasure,StartDate,LocationState,StudyType,StudyFirstSubmitDate,PrimaryCompletionDate,LocationCountry&fmt=JSON`)
            .then(response => response.json())
            .then((json) => {
                console.log(json);
                let clinicalTrialsData = json.above;
            })
            .catch(err => console.log(err));
    }

    handleFormChangeLocation(event) {
        this.setState({locationName: event.target.value}, () => {
            console.log(`Location state: ${this.state.searchKeywords}`);
        })
    }

    handleFormChangeCondition(event) {

        // Format user-entered search terms
        const userEnteredString = event.target.value.replace(' ', '+');
        this.setState({searchKeywords: userEnteredString}, () => {
            console.log(`Condition state: ${this.state.searchKeywords}`);
        })
    }

    handleBlur() {
        this.fetchData();
    }

    componentDidMount() {
        this.getLocation();
        this.fetchData();
    }

    render() {
        const styles = {
            root: {
                color: '#FFFFFF'
            }
        };
        const { classes } = styles;
        return (
            <div className="App">

                <div className={'text-input-area'}>
                    <div className={'field'}>
                        <Form
                            id={'text-field-location'}
                            label={'Enter a location'}
                            handleFormChange={this.handleFormChangeLocation}
                            handleBlur={this.handleBlur}
                            location={this.state.location}
                        />
                    </div>

                    <br/>

                    <div className={'field'}>
                        <Form
                            id={'text-field-condition'}
                            label={'Enter a condition or disease'}
                            handleFormChange={this.handleFormChangeCondition}
                            onBlur={this.handleBlur}
                            location={this.state.location}
                        />
                    </div>
                </div>

                <Map />

            </div>
        );
    }
}

export default App;