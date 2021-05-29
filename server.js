require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const csurf = require("csurf");
const puppeteer = require("puppeteer");
const helmet = require("helmet");
//socket
const socketIo = require("socket.io");
const http = require("http");
const path = require("path");

const errorHandler = require("./middlewares/errorHandler");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const csrfMiddleware = csurf({
  cookie: true,
});

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "super secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(cookieParser());
app.use(csrfMiddleware);
app.use(flash());
//app.use(helmet());

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

//path
app.use((req, res, next) => {
  // const pagePath = req.path.split("/")[1];
  const findPath = (path) => {
    let headerPath;
    if (path === "item") {
      headerPath = "Details";
    }

    if (path === "cart") {
      headerPath = "Cart";
    }

    if (path === "order") {
      headerPath = "Order";
    }
    return headerPath;
  };
  res.locals.pagePath = findPath(req.path.split("/")[1]);
  next();
});

//category
app.use((req, res, next) => {
  res.locals.category = req.query.category;
  next();
});


const homeRoutes = require("./routes/home.route");
const authRoutes = require("./routes/auth.route");
const itemRoutes = require("./routes/item.route");
const cartRoutes = require("./routes/cart.route");
const orderRoutes = require("./routes/order.route");

app.use(homeRoutes);
app.use(authRoutes);
app.use(itemRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

//puppeteer

app.get("/order/:user_id/download", async (req, res, next) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const webPage = await browser.newPage();

    await webPage.goto(
      `https://ladiesportshop.herokuapp.com/order/${req.session.user_id}/submit`,
      {
        waitUntil: "networkidle0",
      }
    );

    const pdf = await webPage.pdf({
      printBackground: true,
      format: "a4",
      margin: {
        top: "10px",
        bottom: "20px",
        left: "20px",
        right: "20px",
      },
    });

    await browser.close();

    res.contentType("application/pdf");
    return res.send(pdf);
  } catch (err) {
    next(err);
  }
});

//socket-io
io.on("connection", (socket) => {
  socket.on("openChat", (data) => {
    io.sockets.emit("teamFirstMessage", data);
  });

  socket.on("sendMessage", (data) => {
    io.sockets.emit("displayMessage", data);
  });
});

app.use((req, res, next) => {
  res.send("Route not found!");
});

//app.use(errorHandler.errorHandler);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
