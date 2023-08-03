import { type FC, useState } from 'react';
import { Form, Link } from 'react-router-dom';

import { Button } from '#/features/ui/button';
import { Input } from '#/features/ui/input';

const HomePage: FC = () => {
  const [appletId, setAppletId] = useState('');
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl">App-Craft</h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          App-Craft is a visual applet builder for Byju&apos;s using prebuilt components.
        </p>
        <Form
          className="grid grid-flow-row items-center gap-2 md:grid-flow-col md:auto-rows-fr"
          method="get"
          action="/view"
        >
          <Button asChild size="lg">
            <Link to="/edit">Create Applet</Link>
          </Button>
          <span className="text-muted-foreground">or</span>
          <Input
            name="id"
            placeholder="Enter Applet Id"
            onChange={(e) => setAppletId(e.currentTarget.value)}
          />
          {appletId && (
            <Button type="submit" size="lg" variant="outline">
              View Applet
            </Button>
          )}
        </Form>
      </div>
    </section>
  );
};

export { HomePage as Component };
