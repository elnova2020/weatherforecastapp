import {Component} from 'react'

export class LocationPreview extends Component{

    // state = {
    //     isFavorite : false
    // }

    // toggleFavorite = () => {
    //     let {isFavorite} = this.state
    //     isFavorite = !isFavorite
    //     this.setState({isFavorite})
    // }

    getWeatherIcon = (iconCode) => {

        const weatheIconImgs = [
            'https://developer.accuweather.com/sites/default/files/01-s.png',
            'https://developer.accuweather.com/sites/default/files/02-s.png',
            'https://developer.accuweather.com/sites/default/files/03-s.png',
            'https://developer.accuweather.com/sites/default/files/04-s.png',
            'https://developer.accuweather.com/sites/default/files/06-s.png',
            'https://developer.accuweather.com/sites/default/files/06-s.png',
            'https://developer.accuweather.com/sites/default/files/07-s.png',
            'https://developer.accuweather.com/sites/default/files/08-s.png',
            '',
            '',
            'https://developer.accuweather.com/sites/default/files/11-s.png',
            'https://developer.accuweather.com/sites/default/files/12-s.png',
            'https://developer.accuweather.com/sites/default/files/13-s.png',
            'https://developer.accuweather.com/sites/default/files/14-s.png',
            'https://developer.accuweather.com/sites/default/files/15-s.png',
            'https://developer.accuweather.com/sites/default/files/16-s.png',
            'https://developer.accuweather.com/sites/default/files/17-s.png',
            'https://developer.accuweather.com/sites/default/files/19-s.png'

        ]

        return weatheIconImgs[iconCode]
    }

    getDate = (date) => {
        return date.split('T')[0]
    }

    render() {
        const {forecast} = this.props 
        // const {isFavorite} = this.state
        // const favBtnState = isFavorite ? '⭐️' : '☆'
        return (
        <div className="forecast-preview">
            <div>
                <img src={this.getWeatherIcon(forecast.Day.Icon)} alt="sunny"/>
            </div>
            <h1>{this.getDate(forecast.Date)}</h1>
            <p>{forecast.Day.IconPhrase}</p>
            <p>{forecast.Temperature.Maximum.Value}<span>{forecast.Temperature.Maximum.Unit}</span></p>
            {/* <button onClick={this.toggleFavorite}>{favBtnState}</button> */}
        </div>
        )
    }
    
}