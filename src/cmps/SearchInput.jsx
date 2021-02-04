import { Component } from 'react'
import { weatherService } from '../services/weatherService'

export class SearchInput extends Component {

    state = {
        cities: [],
        selectedCityKey : 0
    }

    handleInput = async ({ target }) => {

        if (target.value.length < 3) return

        console.log('Changing txt input... target.value is ', target.value)
        
        if (  this.state.cities.length > 0) {
        const cityNames = this.state.cities.map(name => { return name.split(':')[1]})
        
        const city = this.state.cities.filter(city => city.split(':')[0] === target.value )
        const selectedCityKey = city[0].split(':')[1]
        this.setState({selectedCityKey})
        console.log('handleInput --- selected city ', selectedCityKey)
        
        if (cityNames.includes(target.value)) return
        }

        try {

            const cityList = await weatherService.getAutoCompleteCityList(target.value)
            console.log('SearchInput cityList...', cityList)
            const cities = cityList.map(city => `${city.LocalizedName}, ${city.Country.LocalizedName} : ${city.Key}`)
            console.log('SearchInput cities...', cities)
            this.setState({ cities })
        } catch (error) {
            console.log('Get city names failure ', error)
        }

    }

    onSearchCity = (ev) => {
        ev.preventDefault()
        // this.props.onSearchCity(215854)
        this.props.onSearchCity(this.state.selectedCityKey)
    }

    render() {
        const { cities } = this.state
        
        return (
            <form className="flex container" onSubmit={this.onSearchCity}>
                
               <input type="text"  name="city" list="search-cities" onChange={this.handleInput}/>
                    <datalist id="search-cities">
                        {cities && cities.map(city => {
                            const cityKey = city.split(':')[1]
                            const cityName = city.split(':')[0]
                            return <option key={cityKey} value={cityName}>{cityName}</option>
                        })}
                    </datalist>
                <input type="submit" value="Search"/>
            </form>

        )
    }
}