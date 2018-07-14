import "typeface-roboto";
import * as WebCoRE from "webcore";

const injectionPoint = document.getElementById("webcoreApplication");
if (!injectionPoint) {
    throw new Error("Could not find an element with id `phonebookApp`!");
}
WebCoRE.init(injectionPoint);
