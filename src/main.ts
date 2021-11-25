import { load } from "js-yaml";
import { readFileSync } from "fs";

import { parse, filter } from "./utils";

import * as core from "@actions/core";

const run = async (): Promise<void> => {
  try {
    const issueBody = core.getInput("issueBody", { required: true });
    const fileURI = core.getInput("fileURI", { required: true });
    const doc = load(readFileSync(fileURI, "utf8"), {
      json: true,
    }) as file;
    const inputRegion = await parse(issueBody);
    const [approvers, label] = await filter(inputRegion, doc);
    core.setOutput("labelOfRegionToAssignToIssue", label);
    core.setOutput("githubHandlesOfPeopleToBeNotified", approvers);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

run();
