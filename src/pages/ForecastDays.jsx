import { weatherService } from '../services/weatherService'
import { Component } from 'react'
import { ForecastList } from '../cmps/ForecastList'
import { SearchInput } from '../cmps/SearchInput'

export class ForecastDays extends Component {

    state = {
        forecasts: []
    }

    async componentDidMount() {
        try {
            const forecasts = await this.loadWeathers()
            this.setState({ forecasts })
        } catch (error) {
            //show to user an error msg
            console.log(error)
        }

    }

    async loadWeathers() {
        try {
            const forecasts = await weatherService.getDailyForecasts(215854)
            return forecasts
        } catch (error) {
            console.log(error)
        }

    }

    searchCity = async (cityKey) => {

        console.log('On Search City - ForecastDays... cityKey ', cityKey)

        try {
            const forecasts = await weatherService.getDailyForecasts(cityKey)
            return forecasts
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        const { forecasts } = this.state
        console.log('ForecastDays render, forecasts ', forecasts)
        return <div className="container">

            <h1>5 DAYS FORECAST</h1>
            <SearchInput onSearchCity={this.searchCity}/>
            <ForecastList forecasts={forecasts} />
        </div>
    }
}