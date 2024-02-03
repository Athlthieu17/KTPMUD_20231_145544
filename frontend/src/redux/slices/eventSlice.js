import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/constants";
import Thumbnail from "../../assets/images/thumbnail.png";
import axios from "axios";

var fakeData = [];

if (localStorage.getItem("token") !== null) {
  await axios
    .get("http://localhost:8000/api/v1/event/all_event", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      res.data.forEach((e) => {
        fakeData.push({
          id: e.mact,
          name: e.name,
          dateStart: e.ngaybatdau,
          dateEnd: e.ngayketthuc,
          status: STATUS.ACTIVE,
          note: e.detail,
          thumbnail: Thumbnail,
          owner: e.owner,
        });
      });
    });
}

const initialState = {
  evens: fakeData,
};

export const eventSlices = createSlice({
  name: "event",
  initialState,
  reducers: {
    listEvent: (state) => {
      return state.evens;
    },
    filterEvent: (state, actions) => {
      if (actions.payload !== STATUS.ALL) {
        return state.evens.filter((item) => item.status === actions.payload);
      }
      return state.evens;
    },
  },
});

// Action creators are generated for each case reducer function
export const { listEvent } = eventSlices.actions;

export default eventSlices.reducer;
