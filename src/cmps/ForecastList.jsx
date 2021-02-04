import {LocationPreview} from './LocationPreview'

export function ForecastList({forecasts}) {

    return <div className="container flex wrapper">
        {forecasts.map(forecast => <LocationPreview key={forecast.Date} forecast={forecast}/>)}
    </div>

}