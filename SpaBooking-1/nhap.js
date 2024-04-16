public login(payload: Staff): Observable<Staff> {
    const url = `${this.REST_API_SERVER}/authstaff/login`;
    return this.httpClient.post<Staff>(url, payload, this.httpOptions);
  }
  public register(payload: Staff): Observable<Staff> {
    const url = `${this.REST_API_SERVER}/authstaff/register`;
    return this.httpClient.post<Staff>(url, payload, this.httpOptions);
  }