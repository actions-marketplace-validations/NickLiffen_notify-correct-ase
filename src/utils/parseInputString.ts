export const parse = async (input: string): Promise<string> => {
  try {
    const newstring = input.replace(/(\r\n|\n|\r)/gm, "");
    const [, x] = new RegExp("from(.*)Sales").exec(
      newstring
    ) as RegExpExecArray;
    return x.replace("###", "");
  } catch (e) {
    throw e;
  }
};
