import { Router } from "express";

//import subrutas del proyecto
import testRuta from "./test.routes";
import userRuta from "./user.routes";
import postRuta from "./post.routes";
import likeRuta from "./like.routes";

const router = Router();

router.use("/test", testRuta);
router.use("/users", userRuta);
router.use("/posts", postRuta);
router.use("/likes", likeRuta);

export default router;
