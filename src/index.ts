import * as WebCoRE from "webcore";
import "typeface-roboto";

const injectionPoint = document.getElementById("webcoreApplication");
if (!injectionPoint) {
    throw new Error("Could not find an element with id `phonebookApp`!");
}
WebCoRE.init(injectionPoint);
