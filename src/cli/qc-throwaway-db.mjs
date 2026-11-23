#!/usr/bin/env node

import { load } from "../config.mjs";
import { runThrowawayDb } from "./throwaway-db.mjs";

process.exit(await runThrowawayDb(load(), process.argv.slice(2)));
