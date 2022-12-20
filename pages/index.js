import styled from "styled-components";
import Head from "next/head";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import FilterMenu from "../components/FilterMenu/FilterMenu";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import sportLocationsData from "../lib/data/sportLocationsData";

export default function Home() {
  //filter entries -> goal: set multiple filter together
  //Das Filtern soll in der Komponente CardListGeneral passieren

  const [locations, setLocations] = useLocalStorageState("locations", {
    defaultValue: sportLocationsData,
  });

  const [filterData, setFilterData] = useState({
    sport: {
      basketball: false,
      fitness: false,
      other: false,
      soccer: false,
      tennis: false,
      volleyball: false,
    },
    city: { Münster: false, Düsseldorf: false },
    rating: { 1: false, 2: false, 3: false, 4: false, 5: false },
  });

  function handleFilter(event, category) {
    if (event.target.checked) {
      setFilterData({
        ...filterData,
        [category]: { ...filterData[category], [event.target.value]: true },
      });
    } else {
      setFilterData({
        ...filterData,
        [category]: { ...filterData[category], [event.target.value]: false },
      });
    }
  }

  //show / hide Filter Menu
  const [isShowingFilterMenu, setIsShowingFilterMenu] = useState(false);

  function handleShowFilterMenu() {
    setIsShowingFilterMenu(!isShowingFilterMenu);
  }

  //sort function
  function handleChangeSort(event) {
    if (event === "az") {
      setLocations(
        [...locations].sort((a, b) => {
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
      setLocations(
        [...locations].sort((a, b) => {
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
      setLocations([...sportLocationsData].reverse());
    } else if (event === "toNew") {
      setLocations([...sportLocationsData]);
    }
  }

  //favorite function
  const favoriteLocations = locations.filter((location) => location.isFavorite);
  console.log(favoriteLocations);

  function handleToggleFavorite(id) {
    setLocations(
      locations.map((location) =>
        location.id === id
          ? { ...location, isFavorite: !location.isFavorite }
          : location
      )
    );
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
        <Main
          locations={locations}
          filterData={filterData}
          onToggleFavorite={handleToggleFavorite}
        />
        {isShowingFilterMenu && (
          <FilterMenu
            onShowFilterMenu={handleShowFilterMenu}
            onChangeSort={handleChangeSort}
            onFilter={handleFilter}
            filterData={filterData}
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

/* Stand vorher
  <Main passedLocations={passedLocations} filterData={filterData} />

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
} */
