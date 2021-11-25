import { load } from "js-yaml";
import { readFileSync } from "fs";

import { parse, filter } from "./utils";

import * as core from "@actions/core";

const run = async (): Promise<void> => {
  try {
    const issueBody = core.getInput("issueBody", { required: true });
    const fileURI = core.getInput("fileURI", { required: true });

    console.log(issueBody);
    console.log(fileURI);

    const doc = load(readFileSync(fileURI, "utf8"), {
      json: true,
    }) as file;
    console.log(doc);
    const inputRegion = await parse(issueBody);
    const [approvers, label] = await filter(inputRegion, doc);
    console.log(approvers);
    console.log(label);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

run();
