import { Avatar, Heading, Stack, Text } from "@primer/react";
import { createContext, useContext, useEffect } from "react";
import { getComposerAlbums, getComposerMetadata } from "../utils/discography";
import { Album } from "./Album";
import { DashboardContext, WikiLinkButton } from "./Dashboard";

export const DiscographyContext = createContext(null);

function Composer({ name, avatar, yearsActive, wikiLink }) {
  return (
    <Stack direction={"horizontal"} align={"center"} justify={"center"}>
      <Avatar square size={{ narrow: 50, regular: 100, wide: 100 }} src={avatar} />
      <Stack direction={"vertical"} align={"center"} gap={"condensed"}>
        <Heading as="h3" variant="medium">
          {name}
        </Heading>
        <Text>{yearsActive}</Text>
        <WikiLinkButton value={wikiLink} />
      </Stack>
    </Stack>
  );
}

export function Discography({ url }) {
  const { albums, setAlbums, composerMetadata, setComposerMetadata, searchAlbums } = useContext(DiscographyContext);
  const { appLoadType } = useContext(DashboardContext);

  appLoadType === "create" &&
    useEffect(
      () =>
        $.get(url, (data) => {
          let composerMetadata = getComposerMetadata($(data))
          composerMetadata.wikiLink = url.split('/').at(-2)
          setComposerMetadata(composerMetadata);
          setAlbums(getComposerAlbums($(data)));
        }),
      []
    );

  const loadAlbums = searchAlbums.length ? searchAlbums : albums;

  let renderKey = appLoadType === "create" ? url + searchAlbums?.length : searchAlbums?.length;

  return (
    <div key={renderKey}>
      <Composer
        name={composerMetadata.composerName}
        avatar={composerMetadata.composerPic}
        yearsActive={composerMetadata.yearsActive}
        wikiLink={composerMetadata.wikiLink}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 250px))",
          justifyContent: "center",
        }}
      >
        {loadAlbums.map(({ albumName, isLinkValid }) => (
          <Album key={albumName} name={albumName} isLinkValid={isLinkValid} />
        ))}
      </div>
    </div>
  );
}
