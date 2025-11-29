import { GlobeIcon, MoonIcon, RocketIcon, SunIcon } from "@primer/octicons-react";
import { Button, Stack } from "@primer/react";
import { FormControl, TextInput, Dialog } from "@primer/react";
import { Blankslate } from "@primer/react/experimental";
import { createContext, useContext, useState } from "react";
import { Discography, DiscographyContext } from "./Discography";
import "Styles/Dashboard.css";

export const DashboardContext = createContext(null);

function URLChecker(url) {
  try {
    let urlObj = new URL(url);
    const { origin, pathname } = urlObj;
    let checkedUrl = /[w{2}\.]wikipedia.org/.test(origin)
      ? pathname.includes("/wiki/")
        ? `${origin}/w/rest.php/v1/page/${pathname.split("/").pop()}/html`
        : pathname.includes("/w/rest.php/v1/page/")
        ? url
        : false
      : false;
    return checkedUrl;
  } catch {
    return false;
  }
}

export function WikiLinkButton({ value }) {
  return (
    <Stack align={"center"} justify={"center"} padding={"none"}>
      <Button
        href={`https://en.wikipedia.org/w/rest.php/v1/page/${value}/html`}
        target="_blank"
        leadingVisual={<GlobeIcon size={16} />}
        as="a"
        variant="primary"
      >
        Wiki Link
      </Button>
    </Stack>
  );
}

function ComposerLinkInputPage({ toggleCreateDialog, setComposerURL }) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const { setAppLoadType } = useContext(DashboardContext);
  return (
    <Dialog title="Create Composer Dashboard" onClose={() => toggleCreateDialog(false)}>
      <FormControl required>
        <FormControl.Label>URL</FormControl.Label>
        <TextInput
          placeholder="Enter wikipedia URL"
          block
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          leadingVisual={<GlobeIcon size={16} />}
        />
        {error && setTimeout(() => setError(false), 3000) && (
          <FormControl.Validation variant="error">Invalid URL</FormControl.Validation>
        )}
        <Stack direction={"horizontal"} align={"center"} justify={"center"} padding={"condensed"}>
          <Button
            variant="primary"
            onClick={() => {
              let url = URLChecker(inputValue);
              url
                ? (setComposerURL(url), setAppLoadType("create"), toggleCreateDialog(false))
                : (setError(true), setInputValue(""));
            }}
          >
            Create
          </Button>
          <Button variant="danger" onClick={() => setInputValue("")}>
            Reset
          </Button>
        </Stack>
      </FormControl>
    </Dialog>
  );
}

function CreatePage({ toggleCreate }) {
  return (
    <Blankslate spacious className="overlay_center">
      <Blankslate.Heading>Welcome to WikiSongs</Blankslate.Heading>
      <Blankslate.Description>
        Use WikiSongs to store any composer's discography & filmography songs metadata, retrieved from Wikipedia.
      </Blankslate.Description>
      <Blankslate.PrimaryAction
        size="large"
        onClick={() => toggleCreate(true)}
        leadingVisual={<RocketIcon size={16} />}
      >
        Create
      </Blankslate.PrimaryAction>
    </Blankslate>
  );
}

export function Dashboard() {
  const [isCreateDialogActive, setCreateDialogActive] = useState(false);
  const [composerURL, setComposerURL] = useState(null);
  const { appLoadType, darkMode, setDarkMode } = useContext(DashboardContext);
  const { searchAlbums } = useContext(DiscographyContext);

  return (
    <div>
      {isCreateDialogActive && (
        <ComposerLinkInputPage toggleCreateDialog={setCreateDialogActive} setComposerURL={setComposerURL} />
      )}

      {!appLoadType && <CreatePage createStatus={isCreateDialogActive} toggleCreate={setCreateDialogActive} />}

      {appLoadType && (
        <Discography
          key={appLoadType === "create" ? composerURL : searchAlbums?.length} // runtime error when key is dynamic - needs review.
          url={composerURL}
        />
      )}

      <div>
        <Button
          variant="invisible"
          className="colorMode-button"
          onClick={(e) => {
            e.stopPropagation(), setDarkMode(!darkMode);
          }}
        >
          {darkMode ? <SunIcon size={16} /> : <MoonIcon size={16} />}
        </Button>
      </div>
    </div>
  );
}
