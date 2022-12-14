import styled from "styled-components";
import { useState } from "react";
import Head from "next/head";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import InputText from "../../components/Inputs/InputText";
import InputCheckbox from "../../components/Inputs/InputCheckbox";
import { selectSports, selectSurfaces } from "../../lib/data/selectData";

export default function NewEntryForm({ startFetching }) {
  const [isSent, setIsSent] = useState(false);

  async function handleCreateNewNote(newLocation) {
    await fetch("/api/locations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLocation),
    });
    startFetching();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target.elements;
    const title = form.title.value;
    const info = {
      sport: form.sport.value,
      numberOfCourts: Number(form.numberOfCourts.value),
      surface: form.surface.value,
    };
    const address = {
      street: form.street.value,
      houseNumber: Number(form.houseNumber.value),
      postcode: Number(form.postcode.value),
      city: form.city.value,
    };
    const infrastructure = {
      lighting: form.lighting.checked,
      wheelchair: form.wheelchair.checked,
    };
    const outdoor = form.outdoor.checked;
    const isPublic = form.isPublic.checked;
    const rating = Number(form.rating.value);

    const newLocation = {
      title: title,
      info: info,
      address: address,
      latitude: "52.124535", //hardcoded for the moment -> function will be added after map added to the app
      longitude: "6.36345",
      image: `/img/defaultPics/${info.sport}.jpg`,
      infrastructure: infrastructure,
      outdoor: outdoor,
      public: isPublic,
      rating: rating,
    };

    //event.target.reset();
    form.title.focus();
    handleCreateNewNote(newLocation);
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
    }, 3000);
  }

  return (
    <>
      <Head>
        <title>new entry</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledMobileLayout>
        <Header addLocation />
        {isSent && (
          <StyledPopUp>Sportplatz wurde erfolgreich hinzugef??gt!</StyledPopUp>
        )}
        <main>
          <StyledForm aria-labelledby="formTitle" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Allgemeine Infos</legend>
              <InputText
                type="text"
                id="title"
                label="Titel"
                maxLength="50"
                required={true}
              />
            </fieldset>
            <fieldset>
              <legend>Sportplatz</legend>
              <StyledSelectLabel htmlFor="sport">Sportart</StyledSelectLabel>
              <select name="sport" id="sport" required>
                {selectSports.map((sport) => (
                  <option key={sport.value} value={sport.value}>
                    {sport.content}
                  </option>
                ))}
              </select>
              <InputText
                type="number"
                id="numberOfCourts"
                label="Anzahl an Pl??tzen"
                max={100}
                min={1}
              />

              <StyledSelectLabel htmlFor="surface">
                Untergrund
              </StyledSelectLabel>
              <select name="surface" id="surface">
                {selectSurfaces.map((surface) => (
                  <option key={surface.value} value={surface.value}>
                    {surface.content}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset>
              <legend>Adresse</legend>
              <InputText
                type="text"
                id="street"
                label="Stra??e"
                maxLength="40"
                required={true}
              />
              <InputText
                type="number"
                id="houseNumber"
                label="Hausnummer"
                max={99999}
                min={0}
                required={true}
              />
              <InputText
                type="number"
                id="postcode"
                max={99999}
                min={0}
                label="Postleitzahl"
                required={true}
              />
              <InputText
                type="text"
                id="city"
                label="Stadt"
                maxLength="40"
                required={true}
              />
            </fieldset>
            <fieldset id="infrastructure">
              <legend>Infrastruktur</legend>
              <InputCheckbox type="checkbox" id="lighting" label="beleuchtet" />
              <InputCheckbox
                type="checkbox"
                id="wheelchair"
                label="barrierefrei"
              />
              <InputCheckbox type="checkbox" id="outdoor" label="outdoor" />
              <InputCheckbox type="checkbox" id="isPublic" label="??ffentlich" />
            </fieldset>
            <fieldset>
              <StyledRangeLabel htmlFor="rating">Bewertung</StyledRangeLabel>
              <input
                type="range"
                id="rating"
                name="rating"
                min={0}
                max={5}
                step={0.1}
                list="values"
              />
              <datalist id="values">
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
                <option value="4" label="4"></option>
                <option value="5" label="5"></option>
              </datalist>
            </fieldset>
            <button type="submit">Hinzuf??gen</button>
          </StyledForm>
        </main>
        <Footer atNewEntryForm />
      </StyledMobileLayout>
    </>
  );
}

const StyledMobileLayout = styled.div`
  display: grid;
  grid-template-rows: 4rem auto 4rem;
  height: 100vh;

  main {
    overflow-y: scroll;
  }
`;

const StyledPopUp = styled.div`
  justify-self: center;
  position: absolute;
  top: 10rem;
  z-index: 100;
  padding: 2.5rem;
  margin: 0 1rem;
  background-color: green;
  color: var(--color-foreground-alt);
  opacity: 0.95;
  font-size: 1.5rem;
  line-height: 2.2rem;
  text-align: center;
  border-radius: 5px;
`;

const StyledForm = styled.form`
  display: grid;
  margin: 0.5rem 1rem;

  fieldset {
    display: grid;
    border: none;
  }

  fieldset[id="infrastructure"] {
    display: grid;
    grid-row: auto;
    grid-template-columns: 1fr 1fr;
  }

  legend {
    display: none;
  }

  input[type="checkbox"] {
    margin-right: 0.5rem;
  }

  input[type="range"] {
    margin: 0 1rem;
  }

  select {
    font-size: 1rem;
    padding: 2px 0 2px 2px;
    border: none;
    box-shadow: 0 1px 0 0 #e5e5e5;
    margin-bottom: 1rem;
  }

  select:focus {
    box-shadow: 0 2px 0 0 green;
    outline: none;
  }

  button {
    justify-self: center;
    margin-top: 2rem;
    padding: 0.5rem 0.8rem;
    font-size: 1.5rem;
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
  }

  datalist {
    display: flex;
    justify-content: space-between;
    writing-mode: horizontal-tb;
    margin: 0 1rem;
  }
`;

const StyledSelectLabel = styled.label`
  font-size: 0.75rem;
  color: #999;
`;

const StyledRangeLabel = styled.label`
  font-size: 0.75rem;
  color: #999;
  margin-top: 1rem;
  margin-bottom: 0.2rem;
`;
