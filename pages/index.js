import styled from "styled-components";
import Head from "next/head";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import FilterMenu from "../components/FilterMenu/FilterMenu";
import { useState, useEffect } from "react";
import sportLocationsData from "../lib/data/sportLocationsData";

export default function Home() {
  //filter entries -> goal: set multiple filter together
  //Das Filtern soll in der Komponente CardListGeneral passieren

  const [passedLocations, setPassedLocations] = useState(sportLocationsData);

  const [filterData, setFilterData] = useState({
    sport: [],
    city: [],
  });

  function handleFilter(event, category) {
    if (event.target.checked) {
      setFilterData({
        ...filterData,
        [category]: [...filterData[category], event.target.value],
      });
    } else {
      setFilterData({
        ...filterData,
        [category]: [
          ...filterData[category].filter(
            (entry) => entry !== event.target.value
          ),
        ],
      });
    }
    console.log(filterData);
  }

  //show / hide Filter Menu
  const [isShowingFilterMenu, setIsShowingFilterMenu] = useState(false);

  function handleShowFilterMenu() {
    setIsShowingFilterMenu(!isShowingFilterMenu);
  }

  function handleChangeSort(event) {
    if (event === "az") {
      setPassedLocations(
        [...passedLocations].sort((a, b) => {
          const nameA = a.title;
          const nameB = b.title;
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
      );
    } else if (event === "za") {
      setPassedLocations(
        [...passedLocations].sort((a, b) => {
          const nameA = a.title;
          const nameB = b.title;
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        })
      );
    } else if (event === "toOld") {
      setPassedLocations([...sportLocationsData].reverse());
    } else if (event === "toNew") {
      setPassedLocations([...sportLocationsData]);
    }
  }

  return (
    <>
      <Head>
        <title>localSports</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MobileLayout>
        <Header onShowFilterMenu={handleShowFilterMenu} />
        <Main passedLocations={passedLocations} filterData={filterData} />
        {isShowingFilterMenu && (
          <FilterMenu
            onShowFilterMenu={handleShowFilterMenu}
            onChangeSort={handleChangeSort}
            onFilter={handleFilter}
          />
        )}
      </MobileLayout>
    </>
  );
}

const MobileLayout = styled.div`
  display: grid;
  grid-template-rows: 4rem auto;
  height: 100vh;

  main {
    overflow-y: scroll;
  }
`;
