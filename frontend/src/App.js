import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './css/App.css';
import HomeHeader from './components/homeHeader';
import HomeNavbar from './components/homeNavbar';

import Home from './routes/home';
import Artwork from './routes/artwork';
import Upload from './routes/upload';
import Login from './routes/login';
import SignUp from './routes/signUp';
import Search from './routes/search';
import Donation from './routes/donation';
import ArtistProfile from "./routes/profileArtist";
import MyProfile from './routes/profileMy';

class App extends Component {
  state = {
    level: "pro",
    category: "art",
    sort: "latest",
  }
  toDefault = () => {
    const containerL = document.querySelector('.level__btn.active');
    containerL.classList.remove('active');
    const defaultL = document.querySelector('#default_level')
    defaultL.classList.add('active');

    const containerC = document.querySelector('.category__btn.active');
    containerC.classList.remove('active');
    const defaultC = document.querySelector('#default_category')
    defaultC.classList.add('active');

    const containerS = document.querySelector('.sort__btn.active');
    containerS.classList.remove('active');
    const defaultS = document.querySelector('#default_sort')
    defaultS.classList.add('active');
    console.log(containerL, containerC, containerS);
  }
  setLevel = (target) => {
    console.log();
    const data = target.dataset.value;
    this.setState({ level: data, category: "art", sort: "latest" });
    const container = document.querySelector('.level__btn.active');
    container.classList.remove('active');
    target.classList.add('active');
    const containerCategory = document.querySelector('.category__btn.active');
    containerCategory.classList.remove('active');
    const defaultCategory = document.querySelector('#default_category')
    defaultCategory.classList.add('active');
    const containerSort = document.querySelector('.sort__btn.active');
    containerSort.classList.remove('active');
    const defaultSort = document.querySelector("#default_sort");
    defaultSort.classList.add('active');
  };
  setCategory = (target) => {
    const data = target.dataset.value;
    this.setState({ category: data });
    const container = document.querySelector('.category__btn.active');
      container.classList.remove('active');
      target.classList.add('active');
  }
  setSort = (target) => {
    const data = target.dataset.value;
    this.setState({ sort: data });
    const container = document.querySelector('.sort__btn.active');
      container.classList.remove('active');
      target.classList.add('active');
  }
  toResearch = (data) => {
    console.log("research", data);
  }
  render() {
    console.log("app", this.state);
    return (
      <>
        <HomeHeader onDefault={this.toDefault} onSearch={ this.toResearch} />
        <HomeNavbar onLevel={this.setLevel} />
        <div className="main__wrap">
          <Routes>
            <Route exact path="/" element={
              <Home
              items={this.state}
              onCategory={this.setCategory}
              onSort={this.setSort}
              />
            }> </Route>
            <Route path="/artwork/:artworkId" element={<Artwork />} ></Route>
            <Route path="/donation" element={<Donation />}></Route>
            <Route path="/artist_profile/:artistId" element={<ArtistProfile />} ></Route>
            <Route path="/my_profile/*" element={<MyProfile />}></Route>
            <Route path="/sign_up" element={<SignUp />} ></Route>
            <Route path="/login"  element={<Login />}></Route>
            <Route path="/search_result" element={<Search />} ></Route>
          <Route path="/upload" element={<Upload />} ></Route>
          </Routes>
        </div>
        {/*<footer>footer</footer>*/}
      </>
    );
  }
  
}

export default App;
