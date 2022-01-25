/**
 * Submit work to challenge API
 * TODO: Integrate with real api
 */
export async function submitWork(form) {}

export async function createSupportTicket(request, challengeId, isSelfService) {
    const supportRequest = {
      ...request,
      challengeId,
      isSelfService,
    }
    // TODO: make the api call
    console.debug('create new support question', supportRequest)
    return supportRequest
  }
