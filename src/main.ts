import { load } from "js-yaml";
import { readFileSync } from "fs";

import { filter } from "./utils";

import * as core from "@actions/core";

const run = async (): Promise<void> => {
  try {
    const { region } = JSON.parse(
      core.getInput("issueBodyPayload", { required: false })
    ) as IssueBodyTemplate;

    console.log(`We found the following region in the issue: ${region}`);

    const fileURI = core.getInput("fileURI", { required: true });
    const doc = load(readFileSync(fileURI, "utf8"), {
      json: true,
    }) as file;

    console.log(
      `We are checking the region: ${region} against the following dataset: `,
      doc
    );

    const [approvers, label] = await filter(region, doc);

    console.log(
      `The following people will get notified to approve the issue: ${approvers}`
    );
    console.log(`The following label will be applied to the issue: ${label}`);

    core.setOutput("labelOfRegionToAssignToIssue", label);
    core.setOutput("githubHandlesOfPeopleToBeNotified", approvers);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

run();
