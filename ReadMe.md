<h1 align="center" row>
    <img src="frontend/assets/ludu_logo.png" width="150" height="" />
</h1>

<p>Ludu is a mobile app that allows you to book board games from gamestores around your current localization. You can either book a game to have it delivered at home or reserve one to pick it up at the store.</p>

## Build with

- [React native Expo](https://reactnative.dev/) with [Redux toolkit](https://redux-toolkit.js.org/)
- [Nestjs](https://nestjs.com/)
- [ansible](https://www.ansible.com/) for Backend deployment

## Screenshots use cases

<details>
  <summary>Booking</summary>

<table>
  <tr>
    <td><img src="./doc/booking.gif" /></td>
  </tr>
</table>

</details>

<details>
  <summary>Register</summary>

<table>
  <tr>
    <td><img src="./doc/register.gif" height="600" /></td>
  </tr>
</table>

</details>

<details>
  <summary>Filter</summary>

<table>
  <tr>
    <td><img src="./doc/token.gif" /></td>
  </tr>
</table>

</details>

<details>
  <summary>Refresh token</summary>

<table>
  <tr>
    <td><img src="./doc/token.gif" /></td>
  </tr>
</table>

</details>

## Fonctionnal Roadmap

- [x] Login / register / edit user information
- [x] List available game in user current localization
- [x] Book a game from a store. Either
- [x] List all bookings from current user
- [x] Auto login with refresh token

## Technical Roadmap

- [x] deploiement générique sans surcharger le stockage server
- [x] JWT auth + refresh token
- [x] Create seeders with e2e test
- [x] Optimize images with .webp
- [x] Localization with google maps api
