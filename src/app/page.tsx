import { Text, Title } from '@tremor/react';

import { Dashboard } from '@/components/dashboard/Dashboard';

export default function Home() {
  return (
    <main className='p-12'>
      <Title>Weather Tracker</Title>
      <Text>
        A little test project for <a href='https://tinybird.co'>TinyBird</a>,{' '}
        <a href='https://turso.tech/'>Turso</a>, <a href='https://tremor.so'>Tremor</a> and{' '}
        <a href='https://orm.drizzle.team/'>Drizzle</a>, by{' '}
        <a href='https://threads.net/@joostschuur'>Joost</a>{' '}
        <a href='https://twitter.com/joostschuur'>Schuur</a>
      </Text>

      <Dashboard />
    </main>
  );
}
