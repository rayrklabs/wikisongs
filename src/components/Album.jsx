import { Avatar, Button, Label, Stack, Text, Truncate } from "@primer/react";
import { createContext, useContext, useState } from "react";
import MusicAlbum from "Assets/music-album.svg";
import { InlineMessage } from "@primer/react/experimental";
import { getAlbumMetadata, getAlbumSongs } from "../utils/album";
import { SongContext, SongDialog } from "./Song";
import { imageToUri } from "../utils/image";

export const AlbumContext = createContext(null);

export function Album({ name, isLinkValid }) {
  const { completedAlbums, setCompletedAlbums, albumsMetadata, setAlbumsMetadata } = useContext(AlbumContext);

  const { songs, setSongs } = useContext(SongContext);

  const [isSongDialogActive, setSongDialogActive] = useState(false);

  let albumMetadata = albumsMetadata[name];
  let isAlbumCompleted = completedAlbums[name];

  function setAlbumCompleted() {
    setCompletedAlbums((albums) => {
      return { ...albums, [name]: !isAlbumCompleted };
    });
  }

  return (
    <Stack
      gap={"condensed"}
      direction={"vertical"}
      align={"center"}
      justify={"center"}
      style={{ cursor: "pointer", backgroundColor: isAlbumCompleted ? "var(--bgColor-success-muted)" : "unset" }}
      padding={"normal"}
      onClick={(e) => {
        e.stopPropagation();
        !songs[name]?.length &&
          $.get(`https://en.wikipedia.org/w/rest.php/v1/page/${name}/html`, (data) => {
            let albumMeta = getAlbumMetadata($(data));
            imageToUri(albumMeta.albumPoster, (imgURI) => {
              albumMeta.albumPoster = imgURI;
              setAlbumsMetadata((metadata) => ({
                ...metadata,
                [name]: albumMeta,
              }));
            });

            let albumSongs = getAlbumSongs($(data));

            setSongs((songs) => {
              return { ...songs, [name]: albumSongs };
            });
          });
        !isSongDialogActive && setSongDialogActive(true);
      }}
    >
      {isSongDialogActive && <SongDialog key={name} albumName={name} toggleSongDialog={setSongDialogActive} />}
      <AlbumHeader isAlbumCompleted={isAlbumCompleted} isLinkValid={isLinkValid} />
      <AlbumMetadata albumName={name} albumMetadata={albumMetadata} />
      <AlbumAction isAlbumCompleted={isAlbumCompleted} toggleCompleted={setAlbumCompleted} />
    </Stack>
  );
}

function AlbumHeader({ isAlbumCompleted, isLinkValid }) {
  return (
    <Stack justify={"center"} align={"center"} gap={"condensed"} padding={"none"}>
      <Label variant={isAlbumCompleted ? "success" : "attention"}>{isAlbumCompleted ? "Completed" : "Open"}</Label>
      {!isLinkValid && (
        <InlineMessage variant="critical" size="small">
          Invalid Link
        </InlineMessage>
      )}
    </Stack>
  );
}

function AlbumMetadata({ albumName, albumMetadata }) {
  return (
    <>
      <Avatar square src={albumMetadata?.albumPoster || MusicAlbum} size={{ narrow: 100, regular: 125, wide: 150 }} />
      <Truncate maxWidth={"15ch"}>{albumName}</Truncate>
      {albumMetadata?.albumYear && <Text>{albumMetadata.albumYear}</Text>}
    </>
  );
}

function AlbumAction({ isAlbumCompleted, toggleCompleted }) {
  return (
    <Stack direction={"horizontal"}>
      <Button
        variant={isAlbumCompleted ? "primary" : "default"}
        size="small"
        onClick={(e) => e.stopPropagation() || toggleCompleted()}
      >
        Done
      </Button>
    </Stack>
  );
}
