export default class Helper {
  static fetchPlayers() {
    fetch("/api/player")
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
  static fetchByPos(pos) {
    fetch("api/player/pos/" + pos)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
  fetchQB() {
    fetch("/api/player/pos/QB")
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
  static fetchRB() {
    fetch("/api/player/pos/RB")
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static fetchTE() {
    fetch("/api/player/pos/TE")
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  fetchWR() {
    fetch("/api/player/pos/WR")
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
}
