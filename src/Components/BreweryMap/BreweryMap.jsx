import React from 'react';

export default function BreweryMap() {
    const breweries = this.state.breweries.length ? (
      this.state.breweries.map((brew, i) => {
        return (
          <Link to={`/breweries/${brew.id}`}>
            <BreweryTitle name={brew.brewery.name} key={i} id={brew.id} />
          </Link>
        );
      })
    ) : (
      <h1>LOADING AHHHH WAIT</h1>
        ); // make a modal component
    
    return(
    <div className="logged-in-root">
        <div className="home-brewery-container">
            {/* {this.state.location ? (
            <Map center={this.state.location} />
          ) : null} */}

            <div className="Home-breweries">{breweries}</div>
        </div>
        </div>;
    )
}