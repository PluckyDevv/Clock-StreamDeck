import streamDeck from "@elgato/streamdeck";
import { Clock } from "./clock";

streamDeck.logger.setLevel("trace");
streamDeck.actions.registerAction(new Clock());
streamDeck.connect();
