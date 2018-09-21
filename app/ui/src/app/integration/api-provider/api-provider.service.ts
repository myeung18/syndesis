// import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { OpenApiUploadSpecification } from '@syndesis/ui/common';
import { Observable } from 'rxjs';

import { ApiHttpService } from '@syndesis/ui/platform';
// import {
//   ApiProviders,
//   ApiProviderData,
//   CustomConnectorRequest
// } from '@syndesis/ui/integration/api-provider/api-provider.models';

import { apiProviderEndpoints } from '@syndesis/ui/integration/api-provider/api-provider.api';
import { ApiProviderData } from '@syndesis/ui/integration/api-provider/api-provider.models';

@Injectable()
export class ApiProviderService {
  constructor(private apiHttpService: ApiHttpService) {}
/*
  getCustomConnector(id: string): Observable<ApiProviderData> {
    return this.apiHttpService
      .setEndpointUrl(apiProviderEndpoints.selectApiProvider, { id })
      .get<ApiProviderData>();
  }

  getCustomConnectorList(): Observable<ApiProviders> {
    return this.apiHttpService
      .setEndpointUrl(apiProviderEndpoints.getApiProviderList, {
        template: 'swagger-connector-template'
      })
      .get<{ items: ApiProviders }>()
      .pipe(
        // TODO: Provide a better <T> typing here
        map(response => response.items)
      );
  }
  */

  validateOpenApiSpecification(
    uploadSpec: OpenApiUploadSpecification
  ): Observable<ApiProviderData> {
    const apiHttpService = this.apiHttpService.setEndpointUrl(
      apiProviderEndpoints.validateOpenApiSpecification
    );
    const { file, url } = uploadSpec;
    return apiHttpService.upload<ApiProviderData>(
      // @ts-ignore
      {
        specification: url || file
      },
      {}
    );
  }

  /*

  createCustomConnector(
    customConnectorRequest: CustomConnectorRequest
  ): Observable<any> {
    const apiHttpService = this.apiHttpService.setEndpointUrl(
      apiProviderEndpoints.submitCustomConnector
    );
    const [rawConnectorSettings, icon, specification] = [
      customConnectorRequest,
      customConnectorRequest.iconFile,
      customConnectorRequest.specificationFile
    ];

    const connectorSettings = this.sanitizeCustomConnectorRequest(
      rawConnectorSettings
    );

    if (specification || icon) {
      const payload = {};
      if (specification) {
        payload['specification'] = specification;
      }
      if (icon) {
        payload['icon'] = icon;
      }
      return apiHttpService.upload(payload, { connectorSettings });
    } else {
      return apiHttpService.post(connectorSettings);
    }
  }

  updateCustomConnector(
    customConnectorRequest: CustomConnectorRequest
  ): Observable<any> {
    const apiHttpService = this.apiHttpService.setEndpointUrl(
      apiProviderEndpoints.selectApiProvider,
      { id: customConnectorRequest.id }
    );
    const [rawConnector, icon] = [
      customConnectorRequest,
      customConnectorRequest.iconFile
    ];

    const connector = this.sanitizeCustomConnectorRequest(rawConnector);

    if (icon) {
      return apiHttpService.upload({ icon }, { connector }, { method: 'PUT' });
    } else {
      return apiHttpService.put(connector);
    }
  }

  deleteCustomConnector(id: string): Observable<any> {
    return this.apiHttpService
      .setEndpointUrl(apiProviderEndpoints.selectApiProvider, { id })
      .delete<any>();
  }

  // Custom connector requests need to be sanitized prior to be submitted to the API
  // Please read: https://github.com/syndesisio/syndesis/issues/980
  private sanitizeCustomConnectorRequest(
    customConnector: CustomConnectorRequest
  ): CustomConnectorRequest {
    const configuredProperties = { ...customConnector.configuredProperties };

    for (const key in configuredProperties) {
      if (configuredProperties.hasOwnProperty(key)) {
        if (
          configuredProperties[key] == null ||
          configuredProperties[key] == undefined ||
          configuredProperties[key] === ''
        ) {
          delete configuredProperties[key];
        }
      }
    }

    return { ...customConnector, configuredProperties };
  }
  */
}
