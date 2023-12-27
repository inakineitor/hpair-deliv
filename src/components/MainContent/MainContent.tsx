import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Fuse from 'fuse.js';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import { db } from '../../utils/firebase.ts';
import { emptyEntry } from '../../utils/mutations.ts';

import { BasicTable } from '../BasicTable.tsx';
import { EntryModal } from '../EntryModal.tsx';
import { SearchBar } from '../SearchBar/SearchBar.tsx';
import { useAuthContext } from '../../contexts/auth-context.tsx';

export function MainContent() {
  const { user } = useAuthContext();

  /* Data Fetching */
  // Data fetching from DB. Would not recommend changing.
  // Reference video for snapshot functionality https://www.youtube.com/watch?v=ig91zc-ERSE
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    // We are returning snapshot to useEffect. Upon unmount, useEffect will run
    // its return function, snapshot, which provides a callback to unsubscribe
    // from the listener

    // ! Database query filters entries for current user. DO NOT CHANGE, editing this query may cause it to fail.
    const q = user?.uid
      ? query(collection(db, 'entries'), where('userid', '==', user.uid))
      : collection(db, 'entries');

    onSnapshot(q, (snapshot) => {
      // Using JS spread operator to convert all of doc.data object properties
      // into a list of properties, and adding our own property with id.
      // this is done because doc id is not in doc.data()
      setEntries(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, [user]);

  /* Entry Search */
  const fuse = useMemo(() => {
    return new Fuse(entries, {
      keys: ['name', 'email', 'description'],
    });
  }, [entries]);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredEntries = useMemo(
    () =>
      searchQuery
        ? fuse
            .search(searchQuery)
            .sort((a, b) => b.score - a.score) // Sort by fuzzy search relevance
            .map((result) => result.item)
        : entries,
    [entries, fuse, searchQuery],
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" spacing={3}>
          <EntryModal entry={emptyEntry} type="add" user={user} />
          <SearchBar onTextChange={setSearchQuery} />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <BasicTable entries={filteredEntries} />
      </Grid>
    </Grid>
  );
}
