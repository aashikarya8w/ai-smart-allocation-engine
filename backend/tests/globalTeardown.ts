export default async function globalTeardown(): Promise<void> {
  // Connection is already closed by individual test afterAll hooks.
  // Nothing to do here.
  console.log("✅ Test suite finished");
}
