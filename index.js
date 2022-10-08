const express = require('express');
const app = express();
const socket = require("socket.io");

// parse requests of content-type - application/json
app.use(express.json());

// app.use(function (req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "*");
// 	res.header("Access-Control-Allow-Methods", "*");
// 	next();
// });

var cors = require('cors');
app.use(cors({ origin: true, credentials: true }));

// Read environment variable
require('dotenv').config();

require('./src/routers/routes')(app);

const PORT = process.env.PORT || 8081;
const server = app.listen(PORT, () => {
	console.log("App listening on port:", PORT);
});

// Socket setup
const io = socket(server, {
	cors: {
		credentials: true,
		origin: "http://localhost:8080"
	},
	// Fix mismatch between versions of your socket.io-client and socket.io server
	allowEIO3: true
});

// const getClientRoom = () => {
// 	let index = 0;
// 	while (true) {
// 		if (!io.sockets.adapter.rooms[index] || io.sockets.adapter.rooms[index].length < 2) {
// 			return index;
// 		}
// 		index++;
// 	}
// }

io.on("connection", (socket) => {
	console.log("Made socket connection");

	// const clientRoom = getClientRoom(); // Lấy room thỏa mãn điều kiện

	socket.join(1);

	// if (io.sockets.adapter.rooms[clientRoom].length < 2) { //kiểm tra xem phòng có dưới 2 ng trong phòng không 
	// 	io.in(clientRoom).emit('statusRoom', 'Đang chờ người lạ ...'); // emit cho tất cả client trong phòng
	// } else {
	// 	io.in(clientRoom).emit('statusRoom', 'Người lạ đã vào phòng'); // emit cho tất cả client trong phòng
	// }

	// socket.on('disconnect', (reason) => { // Khi client thoát thì emit cho người cùng phòng biết
	// 	socket.to(clientRoom).emit('statusRoom', 'Người lạ đã thoát. Đang chờ người tiếp theo ....');
	// });
});