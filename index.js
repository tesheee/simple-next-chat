// const express = require("express");
// const socket = require("socket.io");
// const cors = require("cors");

// const app = express();
// const server = require("http").Server(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
// });

// const rooms = new Map([
//   ["rooms", []],
//   ["messages", []],
// ]);

// const rooms1 = {
//   rooms: [],
//   messages: [],
// };

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// app.get("/rooms:id", (req, res) => {
//   const roomId = req.params.id;
//   const users = rooms1.rooms.find((room) => room.numberRoom === roomId).users;
//   const messages = rooms1.rooms.find(
//     (room) => room.numberRoom === roomId
//   ).messages;
//   res.json({ users, messages });
// });

// app.post("/rooms", (req, res) => {
//   // const { numberRoom, nickname } = req.body;
//   // if (!rooms.has(numberRoom)) {
//   //   rooms.set(
//   //     numberRoom,
//   //     new Map([
//   //       ["users", new Map()],
//   //       ["messages", []],
//   //     ])
//   //   );
//   // }
//   // res.json([...rooms.values()]);
//   const { numberRoom, nickname } = req.body;
//   if (!rooms1.rooms.some((item) => item.roomId === numberRoom)) {
//     rooms1.rooms.push({
//       roomId: numberRoom,
//       users: [{ socketId: "", nickname: nickname }],
//       messages: [],
//     });
//   }
//   res.json([...rooms1.rooms]);
//   console.log(rooms1);
// });

// io.on("connection", (socket) => {
//   // socket.on("room:join", ({ numberRoom, nickname }) => {
//   //   socket.join(numberRoom);
//   //   rooms.get(numberRoom).get("users").set(socket.id, nickname);
//   //   const users = [...rooms.get(numberRoom).get("users").values()];
//   //   socket.broadcast.to(numberRoom).emit("room:joined", users);
//   // });
//   socket.on("room:join", ({ numberRoom, nickname }) => {
//     socket.join(numberRoom);
//     const room = rooms1.rooms.find((room) => room.numberRoom === numberRoom);
//     if (!room) {
//       // Если комнаты нет, добавляем её в массив комнат
//       rooms1.rooms.push({
//         numberRoom,
//         users: [{ socketId: socket.id, nickname }],
//       });
//     } else {
//       // Если комната уже существует, добавляем пользователя в список пользователей этой комнаты
//       room.users.push({ socketId: socket.id, nickname: nickname });
//     }
//     const users = rooms1.rooms.find(
//       (room) => room.numberRoom === numberRoom
//     ).users;
//     socket.broadcast.to(numberRoom).emit("room:joined", users);
//   });

//   socket.on("room:new_message", ({ numberRoom, nickname, text }) => {
//     const room = rooms1.rooms.find((room) => room.numberRoom === numberRoom);
//     if (!room) {
//       // Если комнаты нет, добавляем её в массив комнат
//       rooms1.rooms.push({
//         numberRoom,
//         users: [{ socketId: socket.id, nickname }],
//       });
//     } else {
//       // Если комната уже существует, добавляем пользователя в список пользователей этой комнаты
//       room.messages.push({ name: nickname, text: text });
//     }
//     socket.broadcast
//       .to(numberRoom)
//       .emit("room:new_message", { name: nickname, text: text });
//   });

//   // socket.on("disconnect", () => {
//   //   rooms.forEach((room, numberRoom) => {
//   //     if (room.get("users").delete(socket.id)) {
//   //       const users = [...room.get("users").values()];
//   //       socket.broadcast.to(numberRoom).emit("room:set_users", users);
//   //     }
//   //   });
//   // });
//   socket.on("disconnect", () => {
//     rooms1;
//   });

//   console.log("user connected", socket.id);
// });

// server.listen(4000, (err) => {
//   if (err) {
//     throw Error(err);
//   }
//   console.log("Сервер робит");
// });

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// const express = require("express");
// const socket = require("socket.io");
// const cors = require("cors");

// const app = express();
// const server = require("http").Server(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
// });

// const rooms1 = {
//   rooms: [],
//   messages: [],
// };

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// app.get("/rooms/:id", (req, res) => {
//   const roomId = req.params.id;
//   const room = rooms1.rooms.find((room) => room.roomId === roomId);
//   if (room) {
//     const { users, messages } = room;
//     res.json({ users, messages });
//   } else {
//     res.json({ users: [], messages: [] });
//   }
// });

// app.post("/rooms", (req, res) => {
//   const { numberRoom, nickname } = req.body;
//   if (!rooms1.rooms.some((item) => item.roomId === numberRoom)) {
//     rooms1.rooms.push({
//       roomId: numberRoom,
//       users: [{ socketId: "", nickname }],
//       messages: [],
//     });
//   }
//   res.json(rooms1.rooms.slice(-1));
// });

// io.on("connection", (socket) => {
//   socket.on("room:join", ({ numberRoom, nickname }) => {
//     socket.join(numberRoom);
//     const room = rooms1.rooms.find((room) => room.roomId === numberRoom);
//     if (!room) {
//       rooms1.rooms.push({
//         roomId: numberRoom,
//         users: [{ socketId: socket.id, nickname }],
//         messages: [],
//       });
//     } else {
//       room.users.push({ socketId: socket.id, nickname: nickname });
//     }
//     const users = rooms1.rooms.find((room) => room.roomId === numberRoom).users;
//     socket.broadcast.to(numberRoom).emit("room:joined", users);
//   });

//   socket.on("room:new_message", ({ numberRoom, nickname, text }) => {
//     const room = rooms1.rooms.find((room) => room.roomId === numberRoom);
//     if (!room) {
//       rooms1.rooms.push({
//         roomId: numberRoom,
//         users: [{ socketId: socket.id, nickname }],
//         messages: [],
//       });
//     } else {
//       room.messages.push({ name: nickname, text: text });
//     }
//     socket.emit("room:new_message", { name: nickname, text: text });
//     socket.broadcast.to(numberRoom).emit("room:new_message", {
//       name: nickname,
//       text: text,
//     });
//   });

//   socket.on("disconnect", () => {
//     rooms1.rooms.forEach((room) => {
//       const index = room.users.findIndex((user) => user.socketId === socket.id);
//       if (index !== -1) {
//         room.users.splice(index, 1);
//         const users = room.users;
//         socket.broadcast.to(room.roomId).emit("room:set_users", users);
//       }
//     });
//   });

//   //console.log("user connected", socket.id);
// });

// server.listen(4000, (err) => {
//   if (err) {
//     throw Error(err);
//   }
//   console.log("Сервер работает");
// });

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const express = require("express");
const socket = require("socket.io");
const cors = require("cors");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const chatRooms = {
  rooms: [
    {
      roomId: "",
      users: [
        {
          socketId: "",
          nickname: "",
        },
      ],
      messages: [
        {
          nickname: "",
          text: "",
          date: "",
        },
      ],
    },
  ],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/rooms/:id", (req, res) => {
  const roomId = req.params.id;
  const room = chatRooms.rooms.find((room) => room.roomId === roomId);
  if (room) {
    const { users, messages } = room;
    res.json({ users, messages });
  } else {
    res.json({ users: [], messages: [] });
  }
});

app.post("/rooms", (req, res) => {
  const { numberRoom, nickname } = req.body;
  if (!chatRooms.rooms.some((item) => item.roomId === numberRoom)) {
    chatRooms.rooms.push({
      roomId: numberRoom,
      users: [{ socketId: "", nickname }],
      messages: [],
    });
  }
  res.json(chatRooms.rooms.slice(-1));
});

io.on("connection", (socket) => {
  socket.on("room:join", ({ numberRoom, nickname }) => {
    socket.join(numberRoom);
    const room = chatRooms.rooms.find((room) => room.roomId === numberRoom);
    //Проверка на наличие комнаты
    if (!room) {
      chatRooms.rooms.push({
        roomId: numberRoom,
        users: [{ socketId: "", nickname }],
        messages: [],
      });
    } else {
      room.users.push({ socketId: socket.id, nickname: nickname });
    }
    const users = chatRooms.rooms.find(
      (room) => room.roomId === numberRoom
    ).users;
    socket.to(numberRoom).emit("room:joined", users);
  });

  socket.on("room:new_message", ({ numberRoom, nickname, text, data }) => {
    const room = chatRooms.rooms.find((room) => room.roomId === numberRoom);
    if (!room) {
      chatRooms.rooms.push({
        roomId: numberRoom,
        users: [{ socketId: socket.id, nickname }],
        messages: [],
      });
    } else {
      room.messages.push({
        name: nickname,
        text: text,
        data: Date.now().toExponential(),
      });
    }
    socket.emit("room:new_message", {
      name: nickname,
      text: text,
      data: Date.now().toExponential(),
    });
    socket.to(numberRoom).emit("room:new_message", {
      name: nickname,
      text: text,
      data: Date.now().toExponential(),
    });
  });

  socket.on("disconnect", () => {
    chatRooms.rooms.forEach((room) => {
      const index = room.users.findIndex((user) => user.socketId === socket.id);
      if (index !== -1) {
        room.users.splice(index, 1);
        const users = room.users;
        socket.broadcast.to(room.roomId).emit("room:joined", users);
      }
    });
  });

  //console.log("user connected", socket.id);
});

server.listen(4000, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("Сервер работает");
});
